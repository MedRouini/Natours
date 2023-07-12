const TourModel = require('../models/tourModels');
const UserModel = require('../models/userModel')
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  const tours = await TourModel.find();
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await TourModel.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  if (!tour) {
    return next (new AppError('There is no tour with that name !', 404));
  }
  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour,
  });
});
exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Login into your account',
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: `My Account`,
  });
}
exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await UserModel.findByIdAndUpdate(req.user.id, {
    name: req.body.name,
    email: req.body.email,
  },   
  {
    new: true,
    runValidators: true,
  });
  res.status(200).render('account', {
    title: `My Account`,
    user: updatedUser,
  });
});