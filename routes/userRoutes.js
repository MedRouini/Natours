const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();


router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router.get('/logout', authController.logout);
router.route('/forgot-password').post(authController.forgotPassword);
router.route('/reset-password/:resetToken').patch(authController.resetPassword);

router.use(authController.protectRoute);

router.patch('/update-password', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/update-me', 
userController.uploadUserPhoto,
userController.resizeUserPhoto, 
userController.updateMe);
router.delete('/delete-me', userController.deleteMe);


router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
module.exports = router;
