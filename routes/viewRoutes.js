const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/', 
  bookingController.createBookingCheckout, 
  authController.isUserLoggedIn, 
  viewsController.getOverview
);
router.get('/tour/:slug', authController.isUserLoggedIn, viewsController.getTour);
router.get('/login', authController.isUserLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protectRoute, viewsController.getAccount);
router.post('/submit-user-data', authController.protectRoute, viewsController.updateUserData)

module.exports = router;
