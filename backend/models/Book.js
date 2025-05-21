import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  publishDate: {
    type: Date,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

const Book = mongoose.model('Book', bookSchema);

export default Book;