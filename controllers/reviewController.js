const ReviewModel = require('../models/reviewModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = factory.getAllDocuments(ReviewModel);
exports.setTourIdAndUserIdForLoggedInUser = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.getReview = factory.getDocumentById(ReviewModel);
exports.createReview = factory.createDocument(ReviewModel);
exports.deleteReview = factory.deleteDocument(ReviewModel);
exports.updateReview = factory.updateDocument(ReviewModel);
