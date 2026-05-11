const Account = require('../models/Account');
const EmailInteraction = require('../models/EmailInteraction');
const DistributionEngine = require('../services/DistributionEngine');
const database = require('../database/db');

class AnalyticsController {
    /**
     * Get reputation growth for all accounts
     */
    static async getReputationGrowth(req, res) {
        try {
            const accounts = await Account.findAll();
            
            const reputationData = await Promise.all(
                accounts.map(async (account) => {
                    const history = await database.all(`
                        SELECT reputation_score, recorded_at
                        FROM reputation_history
                        WHERE account_id = ?
                        ORDER BY recorded_at ASC
                    `, [account.id]);

                    return {
                        account_id: account.id,
                        email: account.email,
                        current_reputation: account.reputation_score,
                        history: history
                    };
                })
            );

            res.json({
                success: true,
                data: reputationData
            });
        } catch (error) {
            console.error('Error fetching reputation growth:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch reputation growth',
                details: error.message
            });
        }
    }

    /**
     * Get activity statistics
     */
    static async getActivityStatistics(req, res) {
        try {
            const accounts = await Account.findAll();
            const engagementStats = await EmailInteraction.getEngagementStats();
            const distributionStats = await DistributionEngine.getDistributionStats();

            const accountStats = accounts.map(acc => ({
                id: acc.id,
                email: acc.email,
                is_active: acc.is_active === 1,
                daily_limit: acc.daily_limit,
                current_daily_count: acc.current_daily_count,
                total_sent: acc.total_sent,
                total_received: acc.total_received,
                reputation_score: acc.reputation_score
            }));

            res.json({
                success: true,
                data: {
                    accounts: accountStats,
                    engagement: engagementStats,
                    distribution: distributionStats,
                    summary: {
                        total_accounts: accounts.length,
                        active_accounts: accounts.filter(a => a.is_active === 1).length,
                        total_interactions: engagementStats.total_interactions,
                        total_replies: engagementStats.total_replies,
                        reply_ratio: engagementStats.reply_ratio
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching activity statistics:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch activity statistics',
                details: error.message
            });
        }
    }

    /**
     * Get interaction trends
     */
    static async getInteractionTrends(req, res) {
        try {
            const days = parseInt(req.query.days) || 7;
            
            const trends = await EmailInteraction.getInteractionTrends(days);

            res.json({
                success: true,
                data: {
                    period_days: days,
                    trends: trends
                }
            });
        } catch (error) {
            console.error('Error fetching interaction trends:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch interaction trends',
                details: error.message
            });
        }
    }

    /**
     * Get daily statistics
     */
    static async getDailyStatistics(req, res) {
        try {
            const days = parseInt(req.query.days) || 7;
            
            const stats = await database.all(`
                SELECT * FROM daily_statistics
                ORDER BY date DESC
                LIMIT ?
            `, [days]);

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            console.error('Error fetching daily statistics:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch daily statistics',
                details: error.message
            });
        }
    }

    /**
     * Get overall system analytics
     */
    static async getSystemAnalytics(req, res) {
        try {
            const accounts = await Account.findAll();
            const activeAccounts = accounts.filter(a => a.is_active === 1);
            const engagementStats = await EmailInteraction.getEngagementStats();
            
            const totalReputation = accounts.reduce((sum, acc) => sum + acc.reputation_score, 0);
            const avgReputation = accounts.length > 0 ? totalReputation / accounts.length : 0;

            const totalSent = accounts.reduce((sum, acc) => sum + acc.total_sent, 0);
            const totalReceived = accounts.reduce((sum, acc) => sum + acc.total_received, 0);

            res.json({
                success: true,
                data: {
                    accounts: {
                        total: accounts.length,
                        active: activeAccounts.length,
                        inactive: accounts.length - activeAccounts.length
                    },
                    activity: {
                        total_emails_sent: totalSent,
                        total_emails_received: totalReceived,
                        total_interactions: engagementStats.total_interactions,
                        total_replies: engagementStats.total_replies,
                        reply_ratio: engagementStats.reply_ratio
                    },
                    reputation: {
                        average: Math.round(avgReputation * 100) / 100,
                        highest: Math.max(...accounts.map(a => a.reputation_score)),
                        lowest: Math.min(...accounts.map(a => a.reputation_score))
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching system analytics:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch system analytics',
                details: error.message
            });
        }
    }
}

module.exports = AnalyticsController;
