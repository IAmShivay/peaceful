import mongoose, { Document, Schema } from 'mongoose';

export interface IPlayHistory extends Document {
  _id: string;
  userId?: mongoose.Types.ObjectId;
  soundId: mongoose.Types.ObjectId;
  playedAt: Date;
  duration: number;
  ipAddress?: string;
  userAgent?: string;
}

const PlayHistorySchema = new Schema<IPlayHistory>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null, // Allow anonymous plays
  },
  soundId: {
    type: Schema.Types.ObjectId,
    ref: 'Sound',
    required: [true, 'Sound ID is required'],
  },
  playedAt: {
    type: Date,
    required: [true, 'Play timestamp is required'],
    default: Date.now,
  },
  duration: {
    type: Number,
    required: [true, 'Play duration is required'],
    min: [0, 'Duration cannot be negative'],
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
  timestamps: false, // We're using playedAt instead
});

// Indexes
PlayHistorySchema.index({ userId: 1 });
PlayHistorySchema.index({ soundId: 1 });
PlayHistorySchema.index({ playedAt: -1 });
PlayHistorySchema.index({ userId: 1, playedAt: -1 });
PlayHistorySchema.index({ soundId: 1, playedAt: -1 });

export default mongoose.models.PlayHistory || mongoose.model<IPlayHistory>('PlayHistory', PlayHistorySchema);
