const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/accountController');

// Account management routes
router.post('/', AccountController.createAccount);
router.get('/', AccountController.getAllAccounts);
router.get('/:id', AccountController.getAccount);
router.get('/:id/statistics', AccountController.getAccountStatistics);
router.patch('/:id/enable', AccountController.enableAccount);
router.patch('/:id/disable', AccountController.disableAccount);

module.exports = router;
