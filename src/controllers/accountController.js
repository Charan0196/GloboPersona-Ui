const Account = require('../models/Account');

class AccountController {
    /**
     * Create a new account
     */
    static async createAccount(req, res) {
        try {
            const { email, name } = req.body;

            if (!email || !name) {
                return res.status(400).json({
                    success: false,
                    error: 'Email and name are required'
                });
            }

            // Check if email already exists
            const existing = await Account.findByEmail(email);
            if (existing) {
                return res.status(409).json({
                    success: false,
                    error: 'Account with this email already exists'
                });
            }

            const account = await Account.create(email, name);

            res.status(201).json({
                success: true,
                message: 'Account created successfully',
                data: account
            });
        } catch (error) {
            console.error('Error creating account:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to create account',
                details: error.message
            });
        }
    }

    /**
     * Get account details by ID
     */
    static async getAccount(req, res) {
        try {
            const { id } = req.params;

            const account = await Account.findById(id);

            if (!account) {
                return res.status(404).json({
                    success: false,
                    error: 'Account not found'
                });
            }

            res.json({
                success: true,
                data: account
            });
        } catch (error) {
            console.error('Error fetching account:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch account',
                details: error.message
            });
        }
    }

    /**
     * Get all accounts
     */
    static async getAllAccounts(req, res) {
        try {
            const accounts = await Account.findAll();

            res.json({
                success: true,
                count: accounts.length,
                data: accounts
            });
        } catch (error) {
            console.error('Error fetching accounts:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch accounts',
                details: error.message
            });
        }
    }

    /**
     * Enable an account
     */
    static async enableAccount(req, res) {
        try {
            const { id } = req.params;

            const account = await Account.findById(id);
            if (!account) {
                return res.status(404).json({
                    success: false,
                    error: 'Account not found'
                });
            }

            const updatedAccount = await Account.updateStatus(id, true);

            res.json({
                success: true,
                message: 'Account enabled successfully',
                data: updatedAccount
            });
        } catch (error) {
            console.error('Error enabling account:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to enable account',
                details: error.message
            });
        }
    }

    /**
     * Disable an account
     */
    static async disableAccount(req, res) {
        try {
            const { id } = req.params;

            const account = await Account.findById(id);
            if (!account) {
                return res.status(404).json({
                    success: false,
                    error: 'Account not found'
                });
            }

            const updatedAccount = await Account.updateStatus(id, false);

            res.json({
                success: true,
                message: 'Account disabled successfully',
                data: updatedAccount
            });
        } catch (error) {
            console.error('Error disabling account:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to disable account',
                details: error.message
            });
        }
    }

    /**
     * Get account statistics
     */
    static async getAccountStatistics(req, res) {
        try {
            const { id } = req.params;

            const stats = await Account.getStatistics(id);

            if (!stats) {
                return res.status(404).json({
                    success: false,
                    error: 'Account not found'
                });
            }

            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            console.error('Error fetching account statistics:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch account statistics',
                details: error.message
            });
        }
    }
}

module.exports = AccountController;
