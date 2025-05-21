import express from 'express';
import Page from '../models/Page.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get current page content (e.g., for the home page)
router.get('/', async (req, res) => {
  try {
    const page = await Page.findOne();
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create or update hero section (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { heroTitle, heroSubtitle, heroImage } = req.body;

    let page = await Page.findOne();
    if (page) {
      // Update existing page content
      page.heroTitle = heroTitle;
      page.heroSubtitle = heroSubtitle;
      page.heroImage = heroImage;
      await page.save();
      return res.status(200).json({ message: 'Hero section updated', page });
    } else {
      // Create new page content
      const newPage = new Page({ heroTitle, heroSubtitle, heroImage });
      await newPage.save();
      return res.status(201).json({ message: 'Hero section created', page: newPage });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;
