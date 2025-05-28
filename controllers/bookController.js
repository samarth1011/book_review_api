const Book = require('../models/Book');
const Review = require('../models/Review');

// Create a new book
exports.createBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author) {
      return res.status(400).json({ error: 'Title and author are required' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const book = new Book({ ...req.body, createdBy: req.user.id });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all books with filters and pagination
exports.getBooks = async (req, res) => {
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
};

// Get book by ID with reviews and average rating
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const reviews = await Review.find({ book: book._id });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

    res.json({ book, avgRating, reviews });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search books by title or author
exports.searchBooks = async (req, res) => {
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
};
