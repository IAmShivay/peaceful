'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Music, 
  BarChart3, 
  Settings, 
  Upload, 
  Shield,
  Home,
  FileAudio,
  CreditCard,
  MessageSquare
} from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Audio Files', href: '/admin/audio', icon: FileAudio },
  { name: 'Upload Audio', href: '/admin/upload', icon: Upload },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Categories', href: '/admin/categories', icon: Music },
  { name: 'Support', href: '/admin/support', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
      return;
    }

    if (session.user?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session || session.user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl border-r border-gray-200">
        <div className="flex h-16 items-center justify-center border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600">
          <Link href="/admin" className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="group flex items-center space-x-3 rounded-xl px-4 py-3 text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900 transition-all duration-200 border border-transparent hover:border-blue-100"
                >
                  <div className="p-1 rounded-lg group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-200">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
              <span className="text-sm font-bold">
                {session.user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">
                {session.user?.name}
              </p>
              <div className="flex items-center">
                <Shield className="h-3 w-3 text-blue-600 mr-1" />
                <p className="text-xs text-blue-600 font-medium truncate">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
