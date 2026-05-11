const express = require('express');
const router = express.Router();
const LogsController = require('../controllers/logsController');

// Logs routes
router.get('/', LogsController.getLogs);
router.get('/daily-activity', LogsController.getDailyActivity);
router.get('/engagement-history', LogsController.getEngagementHistory);
router.get('/activity-logs', LogsController.getActivityLogs);
router.get('/interaction/:id', LogsController.getInteractionDetails);

module.exports = router;
