import Link from 'next/link';
import { Play, Download, Star, Users, Music, Headphones, Zap, Shield, ArrowRight, CheckCircle, TrendingUp, Globe, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { DemoCredentials } from '@/components/demo/demo-credentials';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-blue-700/10">
              <Star className="mr-2 h-4 w-4 fill-yellow-400 text-yellow-400" />
              Trusted by 50,000+ creators worldwide
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Premium Audio
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent block mt-2">
                Streaming & Downloads
              </span>
            </h1>
            <p className="mt-8 text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
              Discover, stream, and download high-quality audio content with our comprehensive platform.
              From music to podcasts, sound effects to ambient tracks - everything you need in one place.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                <Play className="mr-2 h-5 w-5" />
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50" asChild>
                <Link href="/browse">
                  Browse Library
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-12">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">50K+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Music className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">100K+</div>
                <div className="text-sm text-gray-600">Audio Tracks</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Download className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">1M+</div>
                <div className="text-sm text-gray-600">Downloads</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Everything you need for audio
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade features designed for creators, businesses, and audio enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="p-0 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">High-Quality Streaming</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Stream audio in lossless quality with adaptive bitrate for the best experience.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader className="p-0 mb-6">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Unlimited Downloads</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Download your favorite tracks and listen offline with flexible download options.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="p-0 mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Secure & Private</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Your data is protected with enterprise-grade security and privacy controls.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardHeader className="p-0 mb-6">
                <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Lightning Fast</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Optimized for speed with global CDN and instant playback capabilities.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-indigo-50 to-indigo-100">
              <CardHeader className="p-0 mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Global Library</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Access millions of tracks from artists and creators around the world.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-pink-50 to-pink-100">
              <CardHeader className="p-0 mb-6">
                <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">Premium Support</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  24/7 customer support with dedicated account managers for premium users.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
              Choose your plan
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and upgrade as you grow. All plans include our core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <Card className="p-8 border-2 border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">Free</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription className="text-gray-600 mt-4">
                  Perfect for getting started with basic audio streaming
                </CardDescription>
              </CardHeader>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">5 downloads per month</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Basic audio quality</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Standard support</span>
                </div>
              </div>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </Card>

            {/* Pro Plan */}
            <Card className="p-8 border-2 border-blue-500 rounded-2xl bg-white hover:shadow-xl transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">Pro</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$9.99</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription className="text-gray-600 mt-4">
                  Ideal for content creators and audio enthusiasts
                </CardDescription>
              </CardHeader>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">100 downloads per month</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">High-quality audio (320kbps)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Priority support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Advanced search filters</span>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/register">Start Free Trial</Link>
              </Button>
            </Card>

            {/* Unlimited Plan */}
            <Card className="p-8 border-2 border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-2xl font-bold text-gray-900">Unlimited</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">$19.99</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <CardDescription className="text-gray-600 mt-4">
                  For professionals who need unlimited access
                </CardDescription>
              </CardHeader>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Unlimited downloads</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Lossless audio quality</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">24/7 premium support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Commercial license</span>
                </div>
              </div>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to get started?
            </h2>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Join thousands of creators who trust AudioStream Pro for their audio needs.
              Start your free trial today and experience the difference.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg" asChild>
                <Link href="/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold rounded-xl" asChild>
                <Link href="/pricing">
                  View All Plans
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Credentials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Try AudioStream Pro Now
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Use these demo credentials to explore all features of our platform
            </p>
          </div>
          <DemoCredentials />
        </div>
      </section>

      <Footer />
    </div>
  );
}
