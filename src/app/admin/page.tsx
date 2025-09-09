'use client';

import { useEffect, useState } from 'react';
import {
  Users,
  Music,
  Download,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  FileAudio,
  Eye,
  UserPlus,
  Upload,
  BarChart3,
  Clock,
  Globe,
  Shield
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalAudioFiles: number;
  totalDownloads: number;
  totalRevenue: number;
  activeUsers: number;
  newUsersToday: number;
  downloadsToday: number;
  revenueToday: number;
}

interface RecentActivity {
  id: string;
  type: 'user_registered' | 'audio_uploaded' | 'download' | 'subscription';
  message: string;
  timestamp: string;
  user?: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, activityResponse] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/activity')
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      if (activityResponse.ok) {
        const activityData = await activityResponse.json();
        setRecentActivity(activityData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      change: stats?.newUsersToday || 0,
      changeText: 'new today',
      icon: Users,
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-600',
      changeType: 'positive'
    },
    {
      title: 'Audio Files',
      value: stats?.totalAudioFiles || 0,
      change: 5,
      changeText: 'uploaded today',
      icon: FileAudio,
      color: 'emerald',
      bgGradient: 'from-emerald-500 to-emerald-600',
      changeType: 'positive'
    },
    {
      title: 'Total Downloads',
      value: stats?.totalDownloads || 0,
      change: stats?.downloadsToday || 0,
      changeText: 'today',
      icon: Download,
      color: 'purple',
      bgGradient: 'from-purple-500 to-purple-600',
      changeType: 'positive'
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers || 0,
      change: 12,
      changeText: 'vs last week',
      icon: Activity,
      color: 'orange',
      bgGradient: 'from-orange-500 to-orange-600',
      changeType: 'positive'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 -m-8">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
        <div className="relative px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white sm:text-5xl">
                      Admin Dashboard
                    </h1>
                    <p className="mt-2 text-xl text-blue-100">
                      Welcome back! Here's your platform overview.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-blue-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">System Online</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">Last updated: {new Date().toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex space-x-4 md:ml-4 md:mt-0">
                <a href="/admin/analytics" className="inline-flex items-center px-6 py-3 border border-white/20 text-sm font-semibold rounded-xl text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg transition-all duration-200 transform hover:scale-105">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Analytics
                </a>
                <a href="/admin/upload" className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg transition-all duration-200 transform hover:scale-105">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Audio
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card, index) => (
            <div
              key={card.title}
              className="group relative bg-white/80 backdrop-blur-sm overflow-hidden rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
              <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.bgGradient}`}></div>
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                        {card.title}
                      </p>
                    </div>
                    <p className="text-4xl font-black text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {typeof card.value === 'string' ? card.value : card.value.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${card.bgGradient} shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                    <card.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-500">Progress</span>
                    <span className="text-xs font-bold text-gray-700">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full bg-gradient-to-r ${card.bgGradient} transition-all duration-1000 ease-out`} style={{ width: '85%' }}></div>
                  </div>
                </div>

                {/* Change Indicator */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-1 rounded-full bg-gradient-to-r ${card.changeType === 'positive' ? 'from-emerald-500 to-emerald-600' : 'from-red-500 to-red-600'}`}>
                      <TrendingUp className={`h-3 w-3 text-white ${card.changeType === 'negative' ? 'rotate-180' : ''}`} />
                    </div>
                    <span className={`text-sm font-bold ${card.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'}`}>
                      +{card.change}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {card.changeText}
                  </span>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor' }}></div>
            </div>
          ))}
        </div>

        {/* Activity and Quick Actions */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-8 py-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Live Activity Feed
                    </h3>
                    <p className="text-sm text-gray-600">Real-time platform events</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg"></div>
                    <span className="text-sm font-semibold text-emerald-600">Live</span>
                  </div>
                  <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                    <Eye className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== recentActivity.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-4">
                          <div>
                            <span className={`h-10 w-10 rounded-full flex items-center justify-center ring-4 ring-white shadow-lg ${
                              activity.type === 'user_registered' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                              activity.type === 'audio_uploaded' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                              'bg-gradient-to-r from-purple-500 to-purple-600'
                            }`}>
                              {activity.type === 'user_registered' ? <UserPlus className="h-5 w-5 text-white" /> :
                               activity.type === 'audio_uploaded' ? <Upload className="h-5 w-5 text-white" /> :
                               <Activity className="h-5 w-5 text-white" />}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {activity.message}
                                </p>
                                <div className="flex items-center mt-1">
                                  <Clock className="h-3 w-3 text-gray-400 mr-1" />
                                  <p className="text-xs text-gray-500">
                                    {new Date(activity.timestamp).toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                activity.type === 'user_registered' ? 'bg-blue-100 text-blue-800' :
                                activity.type === 'audio_uploaded' ? 'bg-emerald-100 text-emerald-800' :
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {activity.type.replace('_', ' ')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Activity className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                      Activity will appear here as users interact with the platform. Check back soon!
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions & System Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white shadow-xl rounded-2xl border border-gray-100">
            <div className="px-6 py-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h3>
              <div className="space-y-4">
                <a href="/admin/users" className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-200 group">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-600 rounded-lg mr-4 group-hover:bg-blue-700 transition-colors">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Manage Users</p>
                      <p className="text-sm text-gray-600">View and manage user accounts</p>
                    </div>
                  </div>
                  <div className="text-blue-600 group-hover:text-blue-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>

                <a href="/admin/upload" className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl hover:from-emerald-100 hover:to-emerald-200 transition-all duration-200 group">
                  <div className="flex items-center">
                    <div className="p-2 bg-emerald-600 rounded-lg mr-4 group-hover:bg-emerald-700 transition-colors">
                      <Upload className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Upload Audio</p>
                      <p className="text-sm text-gray-600">Add new audio content</p>
                    </div>
                  </div>
                  <div className="text-emerald-600 group-hover:text-emerald-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>

                <a href="/admin/analytics" className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-200 group">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-600 rounded-lg mr-4 group-hover:bg-purple-700 transition-colors">
                      <BarChart3 className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">Analytics</p>
                      <p className="text-sm text-gray-600">View detailed reports</p>
                    </div>
                  </div>
                  <div className="text-purple-600 group-hover:text-purple-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white shadow-xl rounded-2xl border border-gray-100">
            <div className="px-6 py-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                System Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900">Database</span>
                  </div>
                  <span className="text-sm text-emerald-600 font-medium">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900">API Services</span>
                  </div>
                  <span className="text-sm text-emerald-600 font-medium">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                    <span className="text-sm font-medium text-gray-900">File Storage</span>
                  </div>
                  <span className="text-sm text-emerald-600 font-medium">Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
