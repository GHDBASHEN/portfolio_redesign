import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a project name.'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description.'],
  },
  projectUrl: {
    type: String,
    trim: true,
    default: '',
  },
  videoUrl: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['Live', 'Ongoing', 'Done (Not Hosted)'],
    default: 'Live',
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL.'],
  },
  order: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  techStack: {
    type: [String],
    default: [],
  },
  contribution: {
    type: String,
    default: '',
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
