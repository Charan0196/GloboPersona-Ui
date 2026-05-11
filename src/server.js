const express = require('express');
const cors = require('cors');
require('dotenv').config();

const database = require('./database/db');
const accountRoutes = require('./routes/accounts');
const activityRoutes = require('./routes/activity');
const analyticsRoutes = require('./routes/analytics');
const logsRoutes = require('./routes/logs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Email Engagement & Activity Distribution System API',
        version: '1.0.0',
        endpoints: {
            accounts: '/api/accounts',
            activity: '/api/activity',
            analytics: '/api/analytics',
            logs: '/api/logs'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/accounts', accountRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/logs', logsRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Initialize database and start server
async function startServer() {
    try {
        console.log('Connecting to database...');
        await database.connect();
        console.log('Database connected successfully');

        app.listen(PORT, () => {
            console.log(`\n🚀 Server is running on port ${PORT}`);
            console.log(`📍 API Base URL: http://localhost:${PORT}`);
            console.log(`📊 Health Check: http://localhost:${PORT}/health`);
            console.log('\n📋 Available Endpoints:');
            console.log(`   - Accounts: http://localhost:${PORT}/api/accounts`);
            console.log(`   - Activity: http://localhost:${PORT}/api/activity`);
            console.log(`   - Analytics: http://localhost:${PORT}/api/analytics`);
            console.log(`   - Logs: http://localhost:${PORT}/api/logs`);
            console.log('\n✨ Ready to accept requests!\n');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('\nShutting down gracefully...');
    await database.close();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\nShutting down gracefully...');
    await database.close();
    process.exit(0);
});

// Start the server
startServer();

module.exports = app;
