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
    type: String
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  },
  coverImage: {
    type: String
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true // helps avoid index error if ISBN is sometimes missing
  },
  publishDate: {
    type: Date
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
