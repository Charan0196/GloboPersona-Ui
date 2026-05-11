const express = require('express');
const router = express.Router();
const ActivityController = require('../controllers/activityController');

// Activity engine routes
router.post('/start', ActivityController.startActivity);
router.post('/pause', ActivityController.pauseActivity);
router.post('/resume', ActivityController.resumeActivity);
router.get('/status', ActivityController.getStatus);
router.post('/run-cycle', ActivityController.runCycle);

module.exports = router;
