'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Music, 
  Download, 
  Heart, 
  Play, 
  Upload,
  Settings,
  CreditCard,
  BarChart3,
  FileAudio,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface UserStats {
  totalUploads: number;
  totalDownloads: number;
  totalPlays: number;
  totalLikes: number;
}

interface RecentAudio {
  id: string;
  title: string;
  duration: number;
  playCount: number;
  downloadCount: number;
  createdAt: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [recentAudio, setRecentAudio] = useState<RecentAudio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
      return;
    }

    fetchDashboardData();
  }, [session, status, router]);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, audioResponse] = await Promise.all([
        fetch('/api/user/stats'),
        fetch('/api/user/audio')
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      if (audioResponse.ok) {
        const audioData = await audioResponse.json();
        setRecentAudio(audioData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const statCards = [
    {
      title: 'My Uploads',
      value: stats?.totalUploads || 0,
      icon: Upload,
      color: 'blue',
    },
    {
      title: 'Total Plays',
      value: stats?.totalPlays || 0,
      icon: Play,
      color: 'green',
    },
    {
      title: 'Downloads',
      value: stats?.totalDownloads || 0,
      icon: Download,
      color: 'purple',
    },
    {
      title: 'Likes Received',
      value: stats?.totalLikes || 0,
      icon: Heart,
      color: 'red',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Welcome back, {session.user?.name}!
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Here's what's happening with your audio content.
            </p>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <Button asChild>
              <Link href="/upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload Audio
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {statCards.map((card) => (
            <div key={card.title} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <card.icon className={`h-6 w-6 text-${card.color}-600`} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {card.title}
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {card.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent Audio Files */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Recent Audio Files
                </h3>
                {recentAudio.length > 0 ? (
                  <div className="space-y-4">
                    {recentAudio.map((audio) => (
                      <div key={audio.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <FileAudio className="h-8 w-8 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{audio.title}</h4>
                            <p className="text-sm text-gray-500">
                              {Math.floor(audio.duration / 60)}:{(audio.duration % 60).toString().padStart(2, '0')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Play className="h-4 w-4 mr-1" />
                            {audio.playCount}
                          </span>
                          <span className="flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            {audio.downloadCount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileAudio className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No audio files</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by uploading your first audio file.
                    </p>
                    <div className="mt-6">
                      <Button asChild>
                        <Link href="/upload">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Audio
                        </Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/upload">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload New Audio
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/browse">
                      <Music className="h-4 w-4 mr-2" />
                      Browse Library
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/analytics">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Subscription Status */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Subscription
                </h3>
                <div className="text-center">
                  <CreditCard className="mx-auto h-8 w-8 text-green-600 mb-2" />
                  <p className="text-sm font-medium text-gray-900">Pro Plan</p>
                  <p className="text-xs text-gray-500 mb-4">Active until Dec 2024</p>
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/subscription">
                      Manage Subscription
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
