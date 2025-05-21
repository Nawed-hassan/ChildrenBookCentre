import express from 'express';
import ContactMessage from '../models/ContactMessage.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Submit a contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const newContactMessage = new ContactMessage({
      name,
      email,
      subject,
      message
    });
    
    await newContactMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all contact messages (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const contactMessages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(contactMessages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Mark contact message as read (admin only)
router.put('/:id/read', auth, async (req, res) => {
  try {
    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    
    if (!updatedMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    
    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a contact message (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedMessage = await ContactMessage.findByIdAndDelete(req.params.id);
    
    if (!deletedMessage) {
      return res.status(404).json({ message: 'Contact message not found' });
    }
    
    res.status(200).json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default router;