const { v4: uuidv4 } = require('uuid');
const database = require('../database/db');

class Account {
    static async create(email, name) {
        const id = uuidv4();
        const initialLimit = parseInt(process.env.INITIAL_DAILY_LIMIT) || 5;
        
        const sql = `
            INSERT INTO accounts (id, email, name, daily_limit, is_active)
            VALUES (?, ?, ?, ?, 1)
        `;
        
        await database.run(sql, [id, email, name, initialLimit]);
        
        // Log account creation
        await this.logActivity(id, 'account_created', `Account created with email: ${email}`);
        
        return await this.findById(id);
    }

    static async findById(id) {
        const sql = 'SELECT * FROM accounts WHERE id = ?';
        return await database.get(sql, [id]);
    }

    static async findByEmail(email) {
        const sql = 'SELECT * FROM accounts WHERE email = ?';
        return await database.get(sql, [email]);
    }

    static async findAll() {
        const sql = 'SELECT * FROM accounts ORDER BY created_at DESC';
        return await database.all(sql);
    }

    static async findActive() {
        const sql = 'SELECT * FROM accounts WHERE is_active = 1 ORDER BY created_at';
        return await database.all(sql);
    }

    static async updateStatus(id, isActive) {
        const sql = `
            UPDATE accounts 
            SET is_active = ?, updated_at = CURRENT_TIMESTAMP 
            WHERE id = ?
        `;
        
        await database.run(sql, [isActive ? 1 : 0, id]);
        
        const status = isActive ? 'enabled' : 'disabled';
        await this.logActivity(id, 'status_changed', `Account ${status}`);
        
        return await this.findById(id);
    }

    static async incrementDailyLimit(id, increment) {
        const maxLimit = parseInt(process.env.MAX_DAILY_LIMIT) || 100;
        
        const sql = `
            UPDATE accounts 
            SET daily_limit = MIN(daily_limit + ?, ?),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        
        await database.run(sql, [increment, maxLimit, id]);
        
        const account = await this.findById(id);
        await this.logActivity(id, 'limit_increased', `Daily limit increased to ${account.daily_limit}`);
        
        return account;
    }

    static async incrementSentCount(id) {
        const sql = `
            UPDATE accounts 
            SET current_daily_count = current_daily_count + 1,
                total_sent = total_sent + 1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        
        await database.run(sql, [id]);
    }

    static async incrementReceivedCount(id) {
        const sql = `
            UPDATE accounts 
            SET total_received = total_received + 1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        
        await database.run(sql, [id]);
    }

    static async resetDailyCounts() {
        const sql = `
            UPDATE accounts 
            SET current_daily_count = 0,
                updated_at = CURRENT_TIMESTAMP
        `;
        
        await database.run(sql);
    }

    static async updateReputation(id, score) {
        const sql = `
            UPDATE accounts 
            SET reputation_score = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `;
        
        await database.run(sql, [score, id]);
        
        // Record in reputation history
        await database.run(`
            INSERT INTO reputation_history (id, account_id, reputation_score)
            VALUES (?, ?, ?)
        `, [uuidv4(), id, score]);
    }

    static async getStatistics(id) {
        const account = await this.findById(id);
        if (!account) return null;

        const interactionStats = await database.get(`
            SELECT 
                COUNT(*) as total_interactions,
                SUM(CASE WHEN is_reply = 1 THEN 1 ELSE 0 END) as total_replies
            FROM email_interactions
            WHERE sender_id = ? OR receiver_id = ?
        `, [id, id]);

        const reputationHistory = await database.all(`
            SELECT * FROM reputation_history
            WHERE account_id = ?
            ORDER BY recorded_at DESC
            LIMIT 10
        `, [id]);

        return {
            ...account,
            statistics: interactionStats,
            reputation_history: reputationHistory
        };
    }

    static async logActivity(accountId, activityType, details) {
        const sql = `
            INSERT INTO activity_logs (id, account_id, activity_type, details)
            VALUES (?, ?, ?, ?)
        `;
        
        await database.run(sql, [uuidv4(), accountId, activityType, details]);
    }

    static async canSendEmail(id) {
        const account = await this.findById(id);
        if (!account || !account.is_active) return false;
        
        return account.current_daily_count < account.daily_limit;
    }
}

module.exports = Account;
