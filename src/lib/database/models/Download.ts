import mongoose, { Document, Schema } from 'mongoose';

export interface IDownload extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  soundId: mongoose.Types.ObjectId;
  downloadedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

const DownloadSchema = new Schema<IDownload>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  soundId: {
    type: Schema.Types.ObjectId,
    ref: 'Sound',
    required: [true, 'Sound ID is required'],
  },
  downloadedAt: {
    type: Date,
    required: [true, 'Download timestamp is required'],
    default: Date.now,
  },
  ipAddress: {
    type: String,
    trim: true,
  },
  userAgent: {
    type: String,
    trim: true,
  },
}, {
  timestamps: false, // We're using downloadedAt instead
});

// Indexes
DownloadSchema.index({ userId: 1 });
DownloadSchema.index({ soundId: 1 });
DownloadSchema.index({ downloadedAt: -1 });
DownloadSchema.index({ userId: 1, downloadedAt: -1 });
DownloadSchema.index({ soundId: 1, downloadedAt: -1 });

export default mongoose.models.Download || mongoose.model<IDownload>('Download', DownloadSchema);
