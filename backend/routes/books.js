import express from 'express';
import Book from '../models/Book.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get featured books
router.get('/featured', async (req, res) => {
  try {
    const featuredBooks = await Book.find({ featured: true }).limit(4);
    res.status(200).json(featuredBooks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get book by slug
router.get('/:slug', async (req, res) => {
  try {
    const book = await Book.findOne({ slug: req.params.slug });
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a new book (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, author, description, price, image, slug, isbn, publishDate, featured } = req.body;
    
    // Check if slug already exists
    const existingBook = await Book.findOne({ slug });
    if (existingBook) {
      return res.status(400).json({ message: 'Book with this slug already exists' });
    }
    
    const newBook = new Book({
      title,
      author,
      description,
      price,
      image,
      slug,
      isbn,
      publishDate,
      featured: featured || false
    });
    
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update a book (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, author, description, price, image, slug, isbn, publishDate, featured } = req.body;
    
    // Check if slug already exists (for a different book)
    if (slug) {
      const existingBook = await Book.findOne({ slug, _id: { $ne: req.params.id } });
      if (existingBook) {
        return res.status(400).json({ message: 'Book with this slug already exists' });
      }
    }
    
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, price, image, slug, isbn, publishDate, featured },
      { new: true }
    );
    
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a book (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;