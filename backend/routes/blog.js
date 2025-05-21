import express from 'express';
import BlogPost from '../models/BlogPost.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().sort({ createdAt: -1 });
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const blogPost = await BlogPost.findOne({ slug: req.params.slug });
    
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a new blog post (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, author, image, slug, excerpt, tags } = req.body;
    
    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      return res.status(400).json({ message: 'Blog post with this slug already exists' });
    }
    
    const newBlogPost = new BlogPost({
      title,
      content,
      author,
      image,
      slug,
      excerpt,
      tags: tags || []
    });
    
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update a blog post (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, author, image, slug, excerpt, tags } = req.body;
    
    // Check if slug already exists (for a different post)
    if (slug) {
      const existingPost = await BlogPost.findOne({ slug, _id: { $ne: req.params.id } });
      if (existingPost) {
        return res.status(400).json({ message: 'Blog post with this slug already exists' });
      }
    }
    
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title, content, author, image, slug, excerpt, tags },
      { new: true }
    );
    
    if (!updatedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.status(200).json(updatedBlogPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a blog post (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);
    
    if (!deletedBlogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;