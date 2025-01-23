import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  designId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Design',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'published', 'cancelled'],
    default: 'scheduled'
  },
  platform: {
    type: String,
    enum: ['facebook', 'instagram', 'twitter', 'linkedin'],
    required: true
  },
  audience: {
    type: String,
    enum: ['all', 'followers', 'custom'],
    default: 'all'
  },
  metrics: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Schedule = mongoose.model('Schedule', scheduleSchema);