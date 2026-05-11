const express = require('express');
const router = express.Router();
const AnalyticsController = require('../controllers/analyticsController');

// Analytics routes
router.get('/reputation-growth', AnalyticsController.getReputationGrowth);
router.get('/activity-statistics', AnalyticsController.getActivityStatistics);
router.get('/interaction-trends', AnalyticsController.getInteractionTrends);
router.get('/daily-statistics', AnalyticsController.getDailyStatistics);
router.get('/system', AnalyticsController.getSystemAnalytics);

module.exports = router;
