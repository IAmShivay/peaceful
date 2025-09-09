import mongoose, { Document, Schema } from 'mongoose';

export interface IAudioFile extends Document {
  title: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  duration: number;
  format: string;
  category: mongoose.Types.ObjectId;
  tags: string[];
  uploadedBy: mongoose.Types.ObjectId;
  isPublic: boolean;
  isPremium: boolean;
  downloadCount: number;
  playCount: number;
  likes: number;
  waveformData?: string;
  thumbnailUrl?: string;
  metadata: {
    bitrate?: number;
    sampleRate?: number;
    channels?: number;
    codec?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const AudioFileSchema = new Schema<IAudioFile>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  fileName: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    required: true,
    enum: ['mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg']
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  playCount: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  waveformData: {
    type: String
  },
  thumbnailUrl: {
    type: String
  },
  metadata: {
    bitrate: Number,
    sampleRate: Number,
    channels: Number,
    codec: String
  }
}, {
  timestamps: true
});

// Indexes for better query performance
AudioFileSchema.index({ title: 'text', description: 'text', tags: 'text' });
AudioFileSchema.index({ category: 1 });
AudioFileSchema.index({ uploadedBy: 1 });
AudioFileSchema.index({ isPublic: 1, isPremium: 1 });
AudioFileSchema.index({ createdAt: -1 });
AudioFileSchema.index({ downloadCount: -1 });
AudioFileSchema.index({ playCount: -1 });

const AudioFile = mongoose.models.AudioFile || mongoose.model<IAudioFile>('AudioFile', AudioFileSchema);
export default AudioFile;
export { AudioFile };
