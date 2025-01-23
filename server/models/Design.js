import mongoose from 'mongoose';

const designSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  componentName: {
    type: String,
    required: true,
    default: 'PromoTemplate1'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Design = mongoose.model('Design', designSchema);