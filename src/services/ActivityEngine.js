const cron = require('node-cron');
const Account = require('../models/Account');
const EmailInteraction = require('../models/EmailInteraction');
const DistributionEngine = require('./DistributionEngine');
const ContentGenerator = require('./ContentGenerator');
const database = require('../database/db');
const { v4: uuidv4 } = require('uuid');

class ActivityEngine {
    constructor() {
        this.isRunning = false;
        this.cronJob = null;
        this.cycleCount = 0;
    }

    /**
     * Starts the automated activity engine
     */
    async start() {
        if (this.isRunning) {
            console.log('Activity engine is already running');
            return { success: false, message: 'Engine already running' };
        }

        this.isRunning = true;
        await this.updateEngineState(true);

        // Schedule based on cron expression from env
        const schedule = process.env.ACTIVITY_CRON_SCHEDULE || '*/5 * * * *';
        
        this.cronJob = cron.schedule(schedule, async () => {
            await this.runCycle();
        });

        console.log(`Activity engine started with schedule: ${schedule}`);
        
        // Run first cycle immediately
        await this.runCycle();

        return { 
            success: true, 
            message: 'Activity engine started successfully',
            schedule 
        };
    }

    /**
     * Pauses the activity engine
     */
    async pause() {
        if (!this.isRunning) {
            return { success: false, message: 'Engine is not running' };
        }

        this.isRunning = false;
        
        if (this.cronJob) {
            this.cronJob.stop();
        }

        await this.updateEngineState(false);

        console.log('Activity engine paused');
        
        return { 
            success: true, 
            message: 'Activity engine paused successfully' 
        };
    }

    /**
     * Resumes the activity engine
     */
    async resume() {
        if (this.isRunning) {
            return { success: false, message: 'Engine is already running' };
        }

        return await this.start();
    }

    /**
     * Gets the current status of the engine
     */
    async getStatus() {
        const state = await database.get('SELECT * FROM activity_engine_state WHERE id = 1');
        
        return {
            is_running: this.isRunning,
            cycle_count: this.cycleCount,
            last_run_at: state?.last_run_at,
            total_cycles: state?.total_cycles || 0
        };
    }

    /**
     * Runs a single activity cycle
     */
    async runCycle() {
        if (!this.isRunning) {
            return;
        }

        console.log(`\n=== Running Activity Cycle #${this.cycleCount + 1} ===`);
        
        try {
            const cycleStats = {
                emails_sent: 0,
                replies_generated: 0,
                accounts_updated: 0,
                errors: 0
            };

            // Step 1: Send new emails
            const emailsSent = await this.sendEmails();
            cycleStats.emails_sent = emailsSent;

            // Step 2: Generate replies
            const repliesGenerated = await this.generateReplies();
            cycleStats.replies_generated = repliesGenerated;

            // Step 3: Update reputation scores
            await DistributionEngine.updateReputationScores();

            // Step 4: Gradually increase activity limits (every 5 cycles)
            if (this.cycleCount % 5 === 0) {
                await DistributionEngine.balanceActivity();
                cycleStats.accounts_updated = (await Account.findActive()).length;
            }

            // Step 5: Update daily statistics
            await this.updateDailyStatistics();

            this.cycleCount++;
            await this.updateEngineState(true, this.cycleCount);

            console.log(`Cycle completed:`, cycleStats);
            console.log(`=== End of Cycle #${this.cycleCount} ===\n`);

            return cycleStats;
        } catch (error) {
            console.error('Error in activity cycle:', error);
            return { error: error.message };
        }
    }

    /**
     * Sends emails based on intelligent distribution
     */
    async sendEmails() {
        const pairs = await DistributionEngine.selectSenderReceiverPairs(20);
        
        let emailsSent = 0;

        for (const { sender, receiver } of pairs) {
            try {
                const subject = ContentGenerator.generateSubject();
                const message = ContentGenerator.generateMessage();

                await EmailInteraction.create(
                    sender.id,
                    receiver.id,
                    subject,
                    message,
                    false,
                    null
                );

                await Account.incrementSentCount(sender.id);
                await Account.incrementReceivedCount(receiver.id);

                emailsSent++;

                console.log(`📧 Email sent: ${sender.email} → ${receiver.email}`);
            } catch (error) {
                console.error(`Error sending email from ${sender.email}:`, error.message);
            }
        }

        return emailsSent;
    }

    /**
     * Generates positive replies to unreplied emails
     */
    async generateReplies() {
        const unrepliedEmails = await EmailInteraction.findUnrepliedInteractions(15);
        const replyProbability = parseFloat(process.env.REPLY_GENERATION_PROBABILITY) || 0.7;
        
        let repliesGenerated = 0;

        for (const email of unrepliedEmails) {
            // Randomly decide whether to reply based on probability
            if (Math.random() > replyProbability) {
                continue;
            }

            try {
                // Check if receiver can send (reply counts as sending)
                const canReply = await Account.canSendEmail(email.receiver_id);
                
                if (!canReply) {
                    continue;
                }

                const replySubject = ContentGenerator.generateReplySubject(email.subject);
                const replyMessage = ContentGenerator.generateReply(email.subject);

                await EmailInteraction.create(
                    email.receiver_id,  // Original receiver becomes sender
                    email.sender_id,    // Original sender becomes receiver
                    replySubject,
                    replyMessage,
                    true,               // This is a reply
                    email.id            // Parent interaction
                );

                await Account.incrementSentCount(email.receiver_id);
                await Account.incrementReceivedCount(email.sender_id);

                repliesGenerated++;

                const receiver = await Account.findById(email.receiver_id);
                const sender = await Account.findById(email.sender_id);
                
                console.log(`💬 Reply generated: ${receiver.email} → ${sender.email}`);
            } catch (error) {
                console.error(`Error generating reply for email ${email.id}:`, error.message);
            }
        }

        return repliesGenerated;
    }

    /**
     * Updates daily statistics
     */
    async updateDailyStatistics() {
        const today = new Date().toISOString().split('T')[0];
        
        const stats = await EmailInteraction.getDailyActivity(today);
        const accounts = await Account.findActive();
        
        const avgReputation = accounts.length > 0
            ? accounts.reduce((sum, acc) => sum + acc.reputation_score, 0) / accounts.length
            : 0;

        const existing = await database.get(
            'SELECT * FROM daily_statistics WHERE date = ?',
            [today]
        );

        if (existing) {
            await database.run(`
                UPDATE daily_statistics
                SET total_emails_sent = ?,
                    total_replies_generated = ?,
                    average_reputation = ?,
                    active_accounts = ?
                WHERE date = ?
            `, [
                stats?.total_emails || 0,
                stats?.total_replies || 0,
                avgReputation,
                accounts.length,
                today
            ]);
        } else {
            await database.run(`
                INSERT INTO daily_statistics 
                (id, date, total_emails_sent, total_replies_generated, average_reputation, active_accounts)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [
                uuidv4(),
                today,
                stats?.total_emails || 0,
                stats?.total_replies || 0,
                avgReputation,
                accounts.length
            ]);
        }
    }

    /**
     * Updates the engine state in database
     */
    async updateEngineState(isRunning, totalCycles = null) {
        const sql = totalCycles !== null
            ? `UPDATE activity_engine_state 
               SET is_running = ?, last_run_at = CURRENT_TIMESTAMP, total_cycles = ?, updated_at = CURRENT_TIMESTAMP 
               WHERE id = 1`
            : `UPDATE activity_engine_state 
               SET is_running = ?, updated_at = CURRENT_TIMESTAMP 
               WHERE id = 1`;
        
        const params = totalCycles !== null 
            ? [isRunning ? 1 : 0, totalCycles]
            : [isRunning ? 1 : 0];

        await database.run(sql, params);
    }

    /**
     * Resets daily counts (should be called at midnight)
     */
    async resetDailyCounts() {
        await Account.resetDailyCounts();
        console.log('Daily counts reset for all accounts');
    }
}

// Singleton instance
const activityEngine = new ActivityEngine();

module.exports = activityEngine;
