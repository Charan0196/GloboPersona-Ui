const activityEngine = require('../services/ActivityEngine');

class ActivityController {
    /**
     * Start the automated activity engine
     */
    static async startActivity(req, res) {
        try {
            const result = await activityEngine.start();

            if (!result.success) {
                return res.status(400).json(result);
            }

            res.json({
                success: true,
                message: result.message,
                data: {
                    schedule: result.schedule,
                    status: 'running'
                }
            });
        } catch (error) {
            console.error('Error starting activity engine:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to start activity engine',
                details: error.message
            });
        }
    }

    /**
     * Pause the activity engine
     */
    static async pauseActivity(req, res) {
        try {
            const result = await activityEngine.pause();

            if (!result.success) {
                return res.status(400).json(result);
            }

            res.json({
                success: true,
                message: result.message,
                data: {
                    status: 'paused'
                }
            });
        } catch (error) {
            console.error('Error pausing activity engine:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to pause activity engine',
                details: error.message
            });
        }
    }

    /**
     * Resume the activity engine
     */
    static async resumeActivity(req, res) {
        try {
            const result = await activityEngine.resume();

            if (!result.success) {
                return res.status(400).json(result);
            }

            res.json({
                success: true,
                message: result.message,
                data: {
                    schedule: result.schedule,
                    status: 'running'
                }
            });
        } catch (error) {
            console.error('Error resuming activity engine:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to resume activity engine',
                details: error.message
            });
        }
    }

    /**
     * Get activity engine status
     */
    static async getStatus(req, res) {
        try {
            const status = await activityEngine.getStatus();

            res.json({
                success: true,
                data: status
            });
        } catch (error) {
            console.error('Error fetching activity status:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch activity status',
                details: error.message
            });
        }
    }

    /**
     * Manually trigger a single activity cycle
     */
    static async runCycle(req, res) {
        try {
            const result = await activityEngine.runCycle();

            res.json({
                success: true,
                message: 'Activity cycle completed',
                data: result
            });
        } catch (error) {
            console.error('Error running activity cycle:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to run activity cycle',
                details: error.message
            });
        }
    }
}

module.exports = ActivityController;
