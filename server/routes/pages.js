import express from 'express';
import Page from '../models/Page.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all pages
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get page by slug
router.get('/:slug', async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a new page (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, slug } = req.body;
    
    // Check if slug already exists
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return res.status(400).json({ message: 'Page with this slug already exists' });
    }
    
    const newPage = new Page({
      title,
      content,
      slug
    });
    
    await newPage.save();
    res.status(201).json(newPage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update a page (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, slug } = req.body;
    
    // Check if slug already exists (for a different page)
    if (slug) {
      const existingPage = await Page.findOne({ slug, _id: { $ne: req.params.id } });
      if (existingPage) {
        return res.status(400).json({ message: 'Page with this slug already exists' });
      }
    }
    
    const updatedPage = await Page.findByIdAndUpdate(
      req.params.id,
      { title, content, slug },
      { new: true }
    );
    
    if (!updatedPage) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    res.status(200).json(updatedPage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a page (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedPage = await Page.findByIdAndDelete(req.params.id);
    
    if (!deletedPage) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;