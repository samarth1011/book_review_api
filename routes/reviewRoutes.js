const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/Book');
const auth = require('../middleware/authMiddleware');

// POST /books/:id/reviews - Submit a review
router.post('/books/:id/reviews', auth, async (req, res) => {
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
});

// PUT /reviews/:id - Update review
router.put('/reviews/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    console.log('Updating review:', review);
    console.log('Authenticated user ID:', req.user.id);
    console.log('Request body:', req.body);
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
});

// DELETE /reviews/:id - Delete  review
router.delete('/reviews/:id', auth, async (req, res) => {
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
});

module.exports = router;
