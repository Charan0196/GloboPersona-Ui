const { v4: uuidv4 } = require('uuid');
const database = require('../database/db');

class EmailInteraction {
    static async create(senderId, receiverId, subject, message, isReply = false, parentInteractionId = null) {
        const id = uuidv4();
        
        const sql = `
            INSERT INTO email_interactions 
            (id, sender_id, receiver_id, subject, message, is_reply, parent_interaction_id, engagement_type)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const engagementType = isReply ? 'positive' : 'initial';
        
        await database.run(sql, [
            id, senderId, receiverId, subject, message, 
            isReply ? 1 : 0, parentInteractionId, engagementType
        ]);
        
        // Update interaction patterns
        await this.updateInteractionPattern(senderId, receiverId);
        
        return await this.findById(id);
    }

    static async findById(id) {
        const sql = 'SELECT * FROM email_interactions WHERE id = ?';
        return await database.get(sql, [id]);
    }

    static async findAll(limit = 100, offset = 0) {
        const sql = `
            SELECT ei.*, 
                   s.email as sender_email, 
                   r.email as receiver_email
            FROM email_interactions ei
            JOIN accounts s ON ei.sender_id = s.id
            JOIN accounts r ON ei.receiver_id = r.id
            ORDER BY ei.sent_at DESC
            LIMIT ? OFFSET ?
        `;
        
        return await database.all(sql, [limit, offset]);
    }

    static async findByAccount(accountId, limit = 50) {
        const sql = `
            SELECT ei.*, 
                   s.email as sender_email, 
                   r.email as receiver_email
            FROM email_interactions ei
            JOIN accounts s ON ei.sender_id = s.id
            JOIN accounts r ON ei.receiver_id = r.id
            WHERE ei.sender_id = ? OR ei.receiver_id = ?
            ORDER BY ei.sent_at DESC
            LIMIT ?
        `;
        
        return await database.all(sql, [accountId, accountId, limit]);
    }

    static async findReplies(parentInteractionId) {
        const sql = `
            SELECT * FROM email_interactions 
            WHERE parent_interaction_id = ?
            ORDER BY sent_at ASC
        `;
        
        return await database.all(sql, [parentInteractionId]);
    }

    static async findUnrepliedInteractions(limit = 20) {
        const sql = `
            SELECT ei.* 
            FROM email_interactions ei
            WHERE ei.is_reply = 0
            AND NOT EXISTS (
                SELECT 1 FROM email_interactions replies
                WHERE replies.parent_interaction_id = ei.id
            )
            ORDER BY ei.sent_at DESC
            LIMIT ?
        `;
        
        return await database.all(sql, [limit]);
    }

    static async updateInteractionPattern(senderId, receiverId) {
        // Check if pattern exists
        const existing = await database.get(`
            SELECT * FROM interaction_patterns
            WHERE sender_id = ? AND receiver_id = ?
        `, [senderId, receiverId]);

        if (existing) {
            await database.run(`
                UPDATE interaction_patterns
                SET interaction_count = interaction_count + 1,
                    last_interaction_at = CURRENT_TIMESTAMP
                WHERE sender_id = ? AND receiver_id = ?
            `, [senderId, receiverId]);
        } else {
            await database.run(`
                INSERT INTO interaction_patterns (id, sender_id, receiver_id, interaction_count)
                VALUES (?, ?, ?, 1)
            `, [uuidv4(), senderId, receiverId]);
        }
    }

    static async getInteractionPattern(senderId, receiverId) {
        const sql = `
            SELECT * FROM interaction_patterns
            WHERE sender_id = ? AND receiver_id = ?
        `;
        
        return await database.get(sql, [senderId, receiverId]);
    }

    static async getEngagementStats() {
        const sql = `
            SELECT 
                COUNT(*) as total_interactions,
                SUM(CASE WHEN is_reply = 1 THEN 1 ELSE 0 END) as total_replies,
                CAST(SUM(CASE WHEN is_reply = 1 THEN 1 ELSE 0 END) AS FLOAT) / 
                    NULLIF(COUNT(*), 0) as reply_ratio
            FROM email_interactions
        `;
        
        return await database.get(sql);
    }

    static async getDailyActivity(date) {
        const sql = `
            SELECT 
                DATE(sent_at) as date,
                COUNT(*) as total_emails,
                SUM(CASE WHEN is_reply = 1 THEN 1 ELSE 0 END) as total_replies
            FROM email_interactions
            WHERE DATE(sent_at) = ?
            GROUP BY DATE(sent_at)
        `;
        
        return await database.get(sql, [date]);
    }

    static async getInteractionTrends(days = 7) {
        const sql = `
            SELECT 
                DATE(sent_at) as date,
                COUNT(*) as total_emails,
                SUM(CASE WHEN is_reply = 1 THEN 1 ELSE 0 END) as total_replies,
                COUNT(DISTINCT sender_id) as unique_senders,
                COUNT(DISTINCT receiver_id) as unique_receivers
            FROM email_interactions
            WHERE sent_at >= datetime('now', '-' || ? || ' days')
            GROUP BY DATE(sent_at)
            ORDER BY date DESC
        `;
        
        return await database.all(sql, [days]);
    }
}

module.exports = EmailInteraction;
