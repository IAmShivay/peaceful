import Link from 'next/link';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';

const plans = [
  {
    name: 'Basic',
    price: 9.99,
    interval: 'month',
    description: 'Perfect for casual listeners',
    icon: Star,
    features: [
      '50 downloads per month',
      'Standard quality audio',
      'Streaming access',
      'Basic support',
      'Mobile app access',
    ],
    popular: false,
  },
  {
    name: 'Pro',
    price: 19.99,
    interval: 'month',
    description: 'Best for content creators',
    icon: Zap,
    features: [
      '200 downloads per month',
      'High quality audio',
      'Premium content access',
      'Priority support',
      'Advanced search filters',
      'Playlist creation',
      'Offline listening',
    ],
    popular: true,
  },
  {
    name: 'Unlimited',
    price: 39.99,
    interval: 'month',
    description: 'For professionals and businesses',
    icon: Crown,
    features: [
      'Unlimited downloads',
      'Premium quality audio',
      'Early access to new content',
      '24/7 dedicated support',
      'API access',
      'Team collaboration tools',
      'Custom licensing options',
      'Analytics dashboard',
    ],
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary-900 sm:text-6xl">
              Choose Your
              <span className="text-gradient block">Perfect Plan</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-secondary-600 max-w-2xl mx-auto">
              Flexible pricing plans designed to grow with your needs. Start free and upgrade anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <Card 
                  key={plan.name} 
                  className={`relative card-hover ${
                    plan.popular 
                      ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-50' 
                      : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <div className="flex justify-center mb-4">
                      <div className={`flex h-16 w-16 items-center justify-center rounded-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-primary-600 to-accent-600' 
                          : 'bg-secondary-100'
                      }`}>
                        <Icon className={`h-8 w-8 ${
                          plan.popular ? 'text-white' : 'text-secondary-600'
                        }`} />
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-secondary-900">
                        ${plan.price}
                      </span>
                      <span className="text-secondary-500">/{plan.interval}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-5 w-5 text-success-600 mr-3 flex-shrink-0" />
                          <span className="text-secondary-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'btn-gradient' 
                          : 'bg-secondary-900 hover:bg-secondary-800'
                      }`}
                      size="lg"
                      asChild
                    >
                      <Link href="/register">
                        Get Started
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-secondary-600">
              Everything you need to know about our pricing and plans.
            </p>
          </div>
          
          <div className="mx-auto max-w-3xl">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  Can I change my plan anytime?
                </h3>
                <p className="text-secondary-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  What happens to my downloads if I cancel?
                </h3>
                <p className="text-secondary-600">
                  All previously downloaded content remains yours to keep. However, you won't be able to download new content after cancellation.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-secondary-600">
                  We offer a 30-day money-back guarantee for all new subscriptions. Contact our support team for assistance.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-secondary-600">
                  Yes, all plans come with a 7-day free trial. No credit card required to start your trial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary-900 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-secondary-300">
              Join thousands of users who trust AudioStream Pro for their audio needs.
            </p>
            <div className="mt-8">
              <Button size="xl" className="btn-gradient" asChild>
                <Link href="/register">
                  Start Your Free Trial
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
