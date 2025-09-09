import { Search, Filter, Play, Download, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';

// Mock data for demonstration
const categories = [
  { id: 1, name: 'Electronic', count: 15420, color: 'bg-blue-500' },
  { id: 2, name: 'Hip Hop', count: 12350, color: 'bg-purple-500' },
  { id: 3, name: 'Rock', count: 9870, color: 'bg-red-500' },
  { id: 4, name: 'Jazz', count: 7650, color: 'bg-yellow-500' },
  { id: 5, name: 'Classical', count: 5430, color: 'bg-green-500' },
  { id: 6, name: 'Ambient', count: 4320, color: 'bg-indigo-500' },
];

const featuredTracks = [
  {
    id: 1,
    title: 'Midnight Dreams',
    artist: 'Luna Beats',
    duration: '3:45',
    category: 'Electronic',
    plays: 15420,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
  },
  {
    id: 2,
    title: 'Urban Vibes',
    artist: 'Street Symphony',
    duration: '4:12',
    category: 'Hip Hop',
    plays: 12350,
    image: 'https://images.unsplash.com/photo-1571974599782-87624638275c?w=300&h=300&fit=crop',
  },
  {
    id: 3,
    title: 'Thunder Road',
    artist: 'Electric Storm',
    duration: '5:23',
    category: 'Rock',
    plays: 9870,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop',
  },
  {
    id: 4,
    title: 'Smooth Sailing',
    artist: 'Jazz Collective',
    duration: '6:15',
    category: 'Jazz',
    plays: 7650,
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop',
  },
];

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-secondary-900 sm:text-6xl">
              Discover Amazing
              <span className="text-gradient block">Audio Content</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-secondary-600 max-w-2xl mx-auto">
              Explore our vast library of high-quality audio tracks, from music to sound effects, 
              podcasts to ambient sounds.
            </p>
            
            {/* Search Bar */}
            <div className="mt-10 flex max-w-2xl mx-auto">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search for tracks, artists, or genres..."
                  leftIcon={<Search />}
                  className="h-12 text-base"
                />
              </div>
              <Button size="lg" className="ml-4 btn-gradient">
                <Filter className="mr-2 h-5 w-5" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-2xl font-bold text-secondary-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <Card key={category.id} className="card-hover cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${category.color} rounded-full mx-auto mb-3`} />
                  <h3 className="font-semibold text-secondary-900">{category.name}</h3>
                  <p className="text-sm text-secondary-500">{category.count.toLocaleString()} tracks</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tracks */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-secondary-900">Featured Tracks</h2>
            <Button variant="outline">View All</Button>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTracks.map((track) => (
              <Card key={track.id} className="card-hover group">
                <div className="relative">
                  <img
                    src={track.image}
                    alt={track.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-lg flex items-center justify-center">
                    <Button size="sm" className="btn-gradient">
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{track.title}</CardTitle>
                  <CardDescription>{track.artist}</CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-secondary-500 mb-4">
                    <span>{track.category}</span>
                    <span>{track.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-secondary-500">
                      {track.plays.toLocaleString()} plays
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary-900 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to access our full library?
            </h2>
            <p className="mt-4 text-lg text-secondary-300">
              Sign up today and get unlimited access to over 100,000 high-quality audio tracks.
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <Button size="xl" className="btn-gradient">
                Start Free Trial
              </Button>
              <Button variant="outline" size="xl" className="border-white text-white hover:bg-white hover:text-secondary-900">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
