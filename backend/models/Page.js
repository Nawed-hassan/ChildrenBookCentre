import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
  heroTitle: {
    type: String,
    required: true
  },
  heroSubtitle: {
    type: String,
    required: true
  },
  heroImage: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Page = mongoose.model('Page', PageSchema);
export default Page;
