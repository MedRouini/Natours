const mongoose = require('mongoose');
const TourModel = require('./tourModels');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },

    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//Each user can review a tour only once
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
reviewSchema.statics.calculateAverageRating = async function (tourId) {
  const ratingStats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        numberOfRatings: { $sum: 1 },
        averageRating: { $avg: '$rating' },
      },
    },
  ]);

  if (ratingStats.length > 0) {
    await TourModel.findByIdAndUpdate(tourId, {
      ratingsQuantity: ratingStats[0].numberOfRatings,
      ratingsAverage: ratingStats[0].averageRating,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calculateAverageRating(this.tour);
});
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.document = await this.findOne();
  next();
});
reviewSchema.post(/^findOneAnd/, async function () {
  await this.document.constructor.calculateAverageRating(this.document.tour);
});

module.exports = mongoose.model('Review', reviewSchema);
