import mongoose, { Document, Schema } from 'mongoose';

export interface ISound extends Document {
  _id: string;
  title: string;
  description?: string;
  duration: number;
  fileUrl: string;
  thumbnailUrl?: string;
  waveformUrl?: string;
  fileSize: number;
  format: string;
  quality: 'standard' | 'high' | 'premium';
  categoryId: mongoose.Types.ObjectId;
  tags: string[];
  isPublic: boolean;
  isPremium: boolean;
  downloadCount: number;
  playCount: number;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SoundSchema = new Schema<ISound>({
  title: {
    type: String,
    required: [true, 'Sound title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [0, 'Duration cannot be negative'],
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required'],
    trim: true,
  },
  thumbnailUrl: {
    type: String,
    trim: true,
  },
  waveformUrl: {
    type: String,
    trim: true,
  },
  fileSize: {
    type: Number,
    required: [true, 'File size is required'],
    min: [0, 'File size cannot be negative'],
  },
  format: {
    type: String,
    required: [true, 'File format is required'],
    lowercase: true,
    enum: {
      values: ['mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg'],
      message: 'Format must be one of: mp3, wav, flac, aac, m4a, ogg',
    },
  },
  quality: {
    type: String,
    required: [true, 'Quality is required'],
    enum: {
      values: ['standard', 'high', 'premium'],
      message: 'Quality must be one of: standard, high, premium',
    },
    default: 'standard',
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true,
    maxlength: [30, 'Tag cannot exceed 30 characters'],
  }],
  isPublic: {
    type: Boolean,
    default: true,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  downloadCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  playCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Uploader is required'],
  },
}, {
  timestamps: true,
});

// Indexes
SoundSchema.index({ categoryId: 1 });
SoundSchema.index({ tags: 1 });
SoundSchema.index({ isPublic: 1 });
SoundSchema.index({ isPremium: 1 });
SoundSchema.index({ uploadedBy: 1 });
SoundSchema.index({ createdAt: -1 });
SoundSchema.index({ downloadCount: -1 });
SoundSchema.index({ playCount: -1 });
SoundSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Compound indexes for common queries
SoundSchema.index({ isPublic: 1, categoryId: 1 });
SoundSchema.index({ isPublic: 1, isPremium: 1 });
SoundSchema.index({ categoryId: 1, createdAt: -1 });

export default mongoose.models.Sound || mongoose.model<ISound>('Sound', SoundSchema);
