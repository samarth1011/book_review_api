const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Review = require('../models/Review');
const auth = require('../middleware/authMiddleware');

// POST /books - Add a new book
router.post('/', auth, async (req, res) => {
  try {
    console.log('Creating book with data:', req.body);
    if (!req.body.title || !req.body.author) {
        return res.status(400).json({ error: 'Title and author are required' });
        }
    // Validate that the user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Create a new book with the authenticated user's ID
    console.log('Authenticated user ID:', req.user.id);
    console.log('Request body:', req.body);
    const book = new Book({ ...req.body, createdBy: req.user.id });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /books - Get all books with optional filters and pagination
router.get('/', async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;
    const query = {};
    if (author) query.author = new RegExp(author, 'i');
    if (genre) query.genre = new RegExp(genre, 'i');

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET /search - Search books by title or author
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Query is required' });

    const regex = new RegExp(query, 'i');
    const books = await Book.find({
      $or: [{ title: regex }, { author: regex }]
    });

    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /books/:id - Book details with avg rating and reviews
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const reviews = await Review.find({ book: book._id });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

    res.json({ book, avgRating, reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
