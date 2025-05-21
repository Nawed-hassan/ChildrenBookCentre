import express from 'express';
import GalleryItem from '../models/GalleryItem.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all gallery items
router.get('/', async (req, res) => {
  try {
    const galleryItems = await GalleryItem.find().sort({ createdAt: -1 });
    res.status(200).json(galleryItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get gallery item by id
router.get('/:id', async (req, res) => {
  try {
    const galleryItem = await GalleryItem.findById(req.params.id);
    
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    
    res.status(200).json(galleryItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a new gallery item (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, image } = req.body;
    
    const newGalleryItem = new GalleryItem({
      title,
      description,
      image
    });
    
    await newGalleryItem.save();
    res.status(201).json(newGalleryItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update a gallery item (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, image } = req.body;
    
    const updatedGalleryItem = await GalleryItem.findByIdAndUpdate(
      req.params.id,
      { title, description, image },
      { new: true }
    );
    
    if (!updatedGalleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    
    res.status(200).json(updatedGalleryItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a gallery item (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedGalleryItem = await GalleryItem.findByIdAndDelete(req.params.id);
    
    if (!deletedGalleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    
    res.status(200).json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;