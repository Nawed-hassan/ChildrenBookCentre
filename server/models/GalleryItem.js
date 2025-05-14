import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, { 
  timestamps: true 
});

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);

export default GalleryItem;