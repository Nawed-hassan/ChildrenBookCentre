import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    trim: true
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
  excerpt: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }]
}, 
{ 
  timestamps: true 
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;