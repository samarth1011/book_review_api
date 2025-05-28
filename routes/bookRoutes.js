const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const bookController = require('../controllers/bookController');

// POST /books - Add a new book (authenticated users only)
router.post('/', auth, bookController.createBook);

// GET /books - Get all books (with pagination, filter by author/genre)
router.get('/', bookController.getBooks);

// GET /books/:id - Get book details with average rating and reviews
router.get('/:id', bookController.getBookById);

// GET /search - Search books by title or author (partial + case-insensitive)
router.get('/search', bookController.searchBooks);

module.exports = router;
