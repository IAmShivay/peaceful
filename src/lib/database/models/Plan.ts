import mongoose, { Document, Schema } from 'mongoose';

export interface IPlan extends Document {
  _id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  interval: 'month' | 'year';
  stripePriceId: string;
  features: {
    [key: string]: any;
  };
  monthlyDownloadLimit: number;
  streamingAccess: boolean;
  downloadAccess: boolean;
  highQualityAccess: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const PlanSchema = new Schema<IPlan>({
  name: {
    type: String,
    required: [true, 'Plan name is required'],
    trim: true,
    maxlength: [50, 'Plan name cannot exceed 50 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  currency: {
    type: String,
    default: 'usd',
    lowercase: true,
    match: [/^[a-z]{3}$/, 'Currency must be a valid 3-letter code'],
  },
  interval: {
    type: String,
    required: [true, 'Billing interval is required'],
    enum: {
      values: ['month', 'year'],
      message: 'Interval must be either month or year',
    },
  },
  stripePriceId: {
    type: String,
    required: [true, 'Stripe price ID is required'],
    unique: true,
    trim: true,
  },
  features: {
    type: Schema.Types.Mixed,
    default: {},
  },
  monthlyDownloadLimit: {
    type: Number,
    required: [true, 'Monthly download limit is required'],
    min: [0, 'Download limit cannot be negative'],
  },
  streamingAccess: {
    type: Boolean,
    default: true,
  },
  downloadAccess: {
    type: Boolean,
    default: true,
  },
  highQualityAccess: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  sortOrder: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes
PlanSchema.index({ stripePriceId: 1 });
PlanSchema.index({ isActive: 1 });
PlanSchema.index({ sortOrder: 1 });
PlanSchema.index({ interval: 1, isActive: 1 });

export default mongoose.models.Plan || mongoose.model<IPlan>('Plan', PlanSchema);
