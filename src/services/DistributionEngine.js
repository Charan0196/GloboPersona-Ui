const Account = require('../models/Account');
const EmailInteraction = require('../models/EmailInteraction');
const database = require('../database/db');

class DistributionEngine {
    /**
     * Intelligently selects sender-receiver pairs avoiding repetitive patterns
     */
    static async selectSenderReceiverPairs(maxPairs = 10) {
        const activeAccounts = await Account.findActive();
        
        if (activeAccounts.length < 2) {
            return [];
        }

        const pairs = [];
        const usedSenders = new Set();
        const usedReceivers = new Set();

        // Get accounts that can still send emails today
        const eligibleSenders = [];
        for (const account of activeAccounts) {
            if (await Account.canSendEmail(account.id)) {
                eligibleSenders.push(account);
            }
        }

        if (eligibleSenders.length === 0) {
            return [];
        }

        // Shuffle senders for randomness
        const shuffledSenders = this.shuffleArray([...eligibleSenders]);
        
        for (const sender of shuffledSenders) {
            if (pairs.length >= maxPairs) break;
            if (usedSenders.has(sender.id)) continue;

            // Find best receiver for this sender
            const receiver = await this.selectBestReceiver(
                sender, 
                activeAccounts, 
                usedReceivers
            );

            if (receiver) {
                pairs.push({
                    sender,
                    receiver
                });
                usedSenders.add(sender.id);
                usedReceivers.add(receiver.id);
            }
        }

        return pairs;
    }

    /**
     * Selects the best receiver for a sender based on interaction history
     */
    static async selectBestReceiver(sender, allAccounts, usedReceivers) {
        // Filter out the sender itself and already used receivers
        const candidates = allAccounts.filter(
            acc => acc.id !== sender.id && !usedReceivers.has(acc.id)
        );

        if (candidates.length === 0) {
            return null;
        }

        // Score each candidate based on interaction history
        const scoredCandidates = [];
        
        for (const candidate of candidates) {
            const pattern = await EmailInteraction.getInteractionPattern(
                sender.id, 
                candidate.id
            );
            
            // Lower score is better (less interaction = more diverse)
            const interactionCount = pattern ? pattern.interaction_count : 0;
            
            // Add randomness to avoid predictable patterns
            const randomFactor = Math.random() * 0.5;
            const score = interactionCount + randomFactor;
            
            scoredCandidates.push({
                account: candidate,
                score
            });
        }

        // Sort by score (ascending) and pick from top candidates randomly
        scoredCandidates.sort((a, b) => a.score - b.score);
        
        // Pick from top 3 candidates randomly for more variety
        const topCandidates = scoredCandidates.slice(0, Math.min(3, scoredCandidates.length));
        const selected = topCandidates[Math.floor(Math.random() * topCandidates.length)];
        
        return selected.account;
    }

    /**
     * Balances the activity across accounts by adjusting daily limits
     */
    static async balanceActivity() {
        const accounts = await Account.findActive();
        const incrementType = process.env.ACTIVITY_INCREMENT_TYPE || 'randomized';
        
        for (const account of accounts) {
            const maxLimit = parseInt(process.env.MAX_DAILY_LIMIT) || 100;
            
            if (account.daily_limit >= maxLimit) {
                continue;
            }

            let increment = 0;
            
            switch (incrementType) {
                case 'odd':
                    increment = 1 + (Math.floor(Math.random() * 5) * 2); // 1, 3, 5, 7, 9
                    break;
                case 'even':
                    increment = 2 + (Math.floor(Math.random() * 4) * 2); // 2, 4, 6, 8
                    break;
                case 'randomized':
                default:
                    const min = parseInt(process.env.MIN_INCREMENT) || 1;
                    const max = parseInt(process.env.MAX_INCREMENT) || 5;
                    increment = min + Math.floor(Math.random() * (max - min + 1));
                    break;
            }

            await Account.incrementDailyLimit(account.id, increment);
        }
    }

    /**
     * Calculates and updates reputation scores for all accounts
     */
    static async updateReputationScores() {
        const accounts = await Account.findAll();
        
        for (const account of accounts) {
            const stats = await this.calculateAccountReputation(account.id);
            await Account.updateReputation(account.id, stats.reputationScore);
        }
    }

    /**
     * Calculates reputation score for an account
     */
    static async calculateAccountReputation(accountId) {
        const sentEmails = await EmailInteraction.findByAccount(accountId);
        
        const totalSent = sentEmails.filter(e => e.sender_id === accountId && !e.is_reply).length;
        const totalReceived = sentEmails.filter(e => e.receiver_id === accountId && !e.is_reply).length;
        const repliesReceived = sentEmails.filter(e => e.receiver_id === accountId && e.is_reply).length;
        const repliesSent = sentEmails.filter(e => e.sender_id === accountId && e.is_reply).length;
        
        // Reputation factors:
        // 1. Reply rate (higher is better)
        // 2. Balance between sent and received (closer to 1:1 is better)
        // 3. Engagement consistency
        
        const replyRate = totalSent > 0 ? repliesReceived / totalSent : 0;
        const balanceFactor = totalSent > 0 && totalReceived > 0 
            ? Math.min(totalSent, totalReceived) / Math.max(totalSent, totalReceived)
            : 0.5;
        
        const engagementScore = (repliesSent + repliesReceived) / Math.max(totalSent + totalReceived, 1);
        
        // Weighted reputation score (0-100)
        const reputationScore = (
            (replyRate * 40) +           // 40% weight on reply rate
            (balanceFactor * 30) +       // 30% weight on balance
            (engagementScore * 30)       // 30% weight on engagement
        ) * 100;
        
        return {
            reputationScore: Math.round(reputationScore * 100) / 100,
            replyRate,
            balanceFactor,
            engagementScore,
            totalSent,
            totalReceived,
            repliesReceived,
            repliesSent
        };
    }

    /**
     * Utility function to shuffle an array
     */
    static shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Gets distribution statistics
     */
    static async getDistributionStats() {
        const accounts = await Account.findActive();
        const totalAccounts = accounts.length;
        
        const patterns = await database.all(`
            SELECT 
                sender_id,
                receiver_id,
                interaction_count,
                last_interaction_at
            FROM interaction_patterns
            ORDER BY interaction_count DESC
            LIMIT 20
        `);

        const avgInteractionsPerPair = patterns.length > 0
            ? patterns.reduce((sum, p) => sum + p.interaction_count, 0) / patterns.length
            : 0;

        return {
            total_active_accounts: totalAccounts,
            total_interaction_patterns: patterns.length,
            avg_interactions_per_pair: Math.round(avgInteractionsPerPair * 100) / 100,
            top_patterns: patterns.slice(0, 10)
        };
    }
}

module.exports = DistributionEngine;
