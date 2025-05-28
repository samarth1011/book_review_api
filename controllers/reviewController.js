const Review = require('../models/Review');

// Submit a review for a book
exports.submitReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = new Review({
      book: req.params.id,
      user: req.user.id,
      rating,
      comment
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a user's own review
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not allowed' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a user's own review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not allowed' });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

};

// Get all reviews (optional, could be filtered by book/user)
exports.getAllReviews = async (req, res) => {
  try {
    const { book, user } = req.query;
    const filter = {};
    if (book) filter.book = book;
    if (user) filter.user = user;

    const reviews = await Review.find(filter).populate('book user', 'title name');
    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found' });
    }
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
