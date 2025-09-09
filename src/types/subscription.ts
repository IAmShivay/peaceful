export interface Plan {
  id: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  plan?: Plan;
  stripeSubscriptionId?: string;
  stripeCustomerId: string;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionCreate {
  planId: string;
  paymentMethodId: string;
}

export interface BillingPortalSession {
  url: string;
}

export interface PaymentIntent {
  clientSecret: string;
  subscriptionId?: string;
}

export interface SubscriptionStats {
  totalSubscriptions: number;
  activeSubscriptions: number;
  cancelledSubscriptions: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  churnRate: number;
}
