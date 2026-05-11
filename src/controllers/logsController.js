const EmailInteraction = require('../models/EmailInteraction');
const database = require('../database/db');

class LogsController {
    /**
     * Get email interaction logs
     */
    static async getLogs(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 50;
            const offset = parseInt(req.query.offset) || 0;
            const accountId = req.query.account_id;

            let logs;
            
            if (accountId) {
                logs = await EmailInteraction.findByAccount(accountId, limit);
            } else {
                logs = await EmailInteraction.findAll(limit, offset);
            }

            res.json({
                success: true,
                count: logs.length,
                limit,
                offset,
                data: logs
            });
        } catch (error) {
            console.error('Error fetching logs:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch logs',
                details: error.message
            });
        }
    }

    /**
     * Get daily activity logs
     */
    static async getDailyActivity(req, res) {
        try {
            const date = req.query.date || new Date().toISOString().split('T')[0];
            
            const activity = await EmailInteraction.getDailyActivity(date);
            
            const detailedLogs = await database.all(`
                SELECT 
                    ei.*,
                    s.email as sender_email,
                    r.email as receiver_email
                FROM email_interactions ei
                JOIN accounts s ON ei.sender_id = s.id
                JOIN accounts r ON ei.receiver_id = r.id
                WHERE DATE(ei.sent_at) = ?
                ORDER BY ei.sent_at DESC
            `, [date]);

            res.json({
                success: true,
                data: {
                    date,
                    summary: activity || { date, total_emails: 0, total_replies: 0 },
                    logs: detailedLogs
                }
            });
        } catch (error) {
            console.error('Error fetching daily activity:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch daily activity',
                details: error.message
            });
        }
    }

    /**
     * Get engagement history
     */
    static async getEngagementHistory(req, res) {
        try {
            const accountId = req.query.account_id;
            const limit = parseInt(req.query.limit) || 50;

            if (!accountId) {
                return res.status(400).json({
                    success: false,
                    error: 'account_id is required'
                });
            }

            const interactions = await EmailInteraction.findByAccount(accountId, limit);
            
            const sentEmails = interactions.filter(i => i.sender_id === accountId && !i.is_reply);
            const receivedEmails = interactions.filter(i => i.receiver_id === accountId && !i.is_reply);
            const sentReplies = interactions.filter(i => i.sender_id === accountId && i.is_reply);
            const receivedReplies = interactions.filter(i => i.receiver_id === accountId && i.is_reply);

            res.json({
                success: true,
                data: {
                    account_id: accountId,
                    summary: {
                        total_sent: sentEmails.length,
                        total_received: receivedEmails.length,
                        replies_sent: sentReplies.length,
                        replies_received: receivedReplies.length
                    },
                    interactions: interactions
                }
            });
        } catch (error) {
            console.error('Error fetching engagement history:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch engagement history',
                details: error.message
            });
        }
    }

    /**
     * Get activity logs (system events)
     */
    static async getActivityLogs(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 100;
            const accountId = req.query.account_id;

            let query = `
                SELECT al.*, a.email
                FROM activity_logs al
                JOIN accounts a ON al.account_id = a.id
            `;
            
            const params = [];
            
            if (accountId) {
                query += ' WHERE al.account_id = ?';
                params.push(accountId);
            }
            
            query += ' ORDER BY al.timestamp DESC LIMIT ?';
            params.push(limit);

            const logs = await database.all(query, params);

            res.json({
                success: true,
                count: logs.length,
                data: logs
            });
        } catch (error) {
            console.error('Error fetching activity logs:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch activity logs',
                details: error.message
            });
        }
    }

    /**
     * Get interaction details including conversation thread
     */
    static async getInteractionDetails(req, res) {
        try {
            const { id } = req.params;

            const interaction = await database.get(`
                SELECT 
                    ei.*,
                    s.email as sender_email,
                    s.name as sender_name,
                    r.email as receiver_email,
                    r.name as receiver_name
                FROM email_interactions ei
                JOIN accounts s ON ei.sender_id = s.id
                JOIN accounts r ON ei.receiver_id = r.id
                WHERE ei.id = ?
            `, [id]);

            if (!interaction) {
                return res.status(404).json({
                    success: false,
                    error: 'Interaction not found'
                });
            }

            // Get replies to this interaction
            const replies = await EmailInteraction.findReplies(id);

            // If this is a reply, get the parent
            let parent = null;
            if (interaction.parent_interaction_id) {
                parent = await database.get(`
                    SELECT 
                        ei.*,
                        s.email as sender_email,
                        r.email as receiver_email
                    FROM email_interactions ei
                    JOIN accounts s ON ei.sender_id = s.id
                    JOIN accounts r ON ei.receiver_id = r.id
                    WHERE ei.id = ?
                `, [interaction.parent_interaction_id]);
            }

            res.json({
                success: true,
                data: {
                    interaction,
                    parent,
                    replies
                }
            });
        } catch (error) {
            console.error('Error fetching interaction details:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch interaction details',
                details: error.message
            });
        }
    }
}

module.exports = LogsController;
