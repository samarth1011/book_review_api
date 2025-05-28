const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const reviewController = require('../controllers/reviewController');

// POST /books/:id/reviews - Submit a review
router.post('/books/:id/reviews', auth, reviewController.submitReview);

// PUT /reviews/:id - Update a review
router.put('/reviews/:id', auth, reviewController.updateReview);

// DELETE /reviews/:id - Delete a review
router.delete('/reviews/:id', auth, reviewController.deleteReview);

module.exports = router;
