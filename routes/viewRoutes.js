const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isUserLoggedIn, viewsController.getOverview);
router.get('/tour/:slug', authController.isUserLoggedIn, viewsController.getTour);
router.get('/login', authController.isUserLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protectRoute, viewsController.getAccount);
router.post('/submit-user-data', authController.protectRoute, viewsController.updateUserData)

module.exports = router;
