import { Users, Target, Award, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';

const stats = [
  { name: 'Active Users', value: '50K+', icon: Users },
  { name: 'Audio Tracks', value: '100K+', icon: Globe },
  { name: 'Countries Served', value: '120+', icon: Target },
  { name: 'Years of Experience', value: '5+', icon: Award },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Former Spotify executive with 10+ years in music technology.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Ex-Google engineer specializing in audio processing and streaming.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Content',
    bio: 'Music industry veteran with extensive label and artist relationships.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary-900 sm:text-6xl">
              About
              <span className="text-gradient block">AudioStream Pro</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-secondary-600 max-w-2xl mx-auto">
              We're on a mission to democratize access to high-quality audio content 
              and empower creators worldwide with the tools they need to succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.name} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                      <Icon className="h-8 w-8 text-primary-600" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-secondary-900">{stat.value}</div>
                  <div className="text-sm text-secondary-600">{stat.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg text-secondary-600">
              <p>
                AudioStream Pro was born from a simple frustration: finding high-quality audio content 
                shouldn't be complicated, expensive, or limited by geography. In 2019, our founders 
                set out to create a platform that would change how people discover, stream, and download audio.
              </p>
              <p>
                What started as a small team of audio enthusiasts has grown into a global platform 
                serving over 50,000 users across 120 countries. We've built partnerships with 
                independent artists, major labels, and content creators to offer the most diverse 
                audio library available.
              </p>
              <p>
                Today, AudioStream Pro continues to innovate with cutting-edge technology, 
                fair pricing, and a commitment to supporting the creative community. We believe 
                that great audio should be accessible to everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
              Our Mission & Values
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
                <CardDescription>
                  Making high-quality audio content accessible to creators and listeners worldwide, 
                  regardless of their location or budget.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Quality</CardTitle>
                <CardDescription>
                  Delivering the highest quality audio experience with lossless streaming, 
                  premium downloads, and cutting-edge technology.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  Building a thriving community of creators, artists, and audio enthusiasts 
                  who support and inspire each other.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-secondary-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-secondary-600">
              The passionate people behind AudioStream Pro.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <Card key={member.name} className="card-hover text-center">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-secondary-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-secondary-900 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Want to learn more?
            </h2>
            <p className="mt-4 text-lg text-secondary-300">
              We'd love to hear from you. Get in touch with our team.
            </p>
            <div className="mt-8">
              <a
                href="mailto:hello@audiostreamPro.com"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 px-8 py-3 text-base font-medium text-white shadow-lg hover:from-primary-700 hover:to-accent-700 transition-all duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
