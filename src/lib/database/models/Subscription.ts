import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscription extends Document {
  _id: string;
  userId: mongoose.Types.ObjectId;
  planId: mongoose.Types.ObjectId;
  stripeSubscriptionId?: string;
  stripeCustomerId: string;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  planId: {
    type: Schema.Types.ObjectId,
    ref: 'Plan',
    required: [true, 'Plan ID is required'],
  },
  stripeSubscriptionId: {
    type: String,
    unique: true,
    sparse: true, // Allows multiple null values
    trim: true,
  },
  stripeCustomerId: {
    type: String,
    required: [true, 'Stripe customer ID is required'],
    trim: true,
  },
  status: {
    type: String,
    required: [true, 'Subscription status is required'],
    enum: {
      values: ['active', 'inactive', 'cancelled', 'past_due'],
      message: 'Status must be one of: active, inactive, cancelled, past_due',
    },
    default: 'inactive',
  },
  currentPeriodStart: {
    type: Date,
    required: [true, 'Current period start is required'],
  },
  currentPeriodEnd: {
    type: Date,
    required: [true, 'Current period end is required'],
  },
  cancelAtPeriodEnd: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Indexes
SubscriptionSchema.index({ userId: 1 });
SubscriptionSchema.index({ stripeSubscriptionId: 1 });
SubscriptionSchema.index({ status: 1 });
SubscriptionSchema.index({ userId: 1, status: 1 });
SubscriptionSchema.index({ currentPeriodEnd: 1 });

// Validate that currentPeriodEnd is after currentPeriodStart
SubscriptionSchema.pre('save', function(next) {
  if (this.currentPeriodEnd <= this.currentPeriodStart) {
    next(new Error('Current period end must be after current period start'));
  } else {
    next();
  }
});

export default mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
