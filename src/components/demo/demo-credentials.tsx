'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

export function DemoCredentials() {
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8 border-blue-200 bg-blue-50/50">
      <CardHeader className="text-center">
        <CardTitle className="text-lg font-semibold text-blue-900 flex items-center justify-center gap-2">
          <Shield className="h-5 w-5" />
          Demo Credentials
        </CardTitle>
        <CardDescription className="text-blue-700">
          Use these credentials to test the application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Regular User */}
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-900">Regular User</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Email:</span>
              <div className="flex items-center gap-2">
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">demo@example.com</code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => copyToClipboard('demo@example.com', 'Email')}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Password:</span>
              <div className="flex items-center gap-2">
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">demo123</code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => copyToClipboard('demo123', 'Password')}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Admin User */}
        <div className="bg-white p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-purple-600" />
            <span className="font-medium text-purple-900">Admin User</span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Email:</span>
              <div className="flex items-center gap-2">
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">admin@example.com</code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => copyToClipboard('admin@example.com', 'Email')}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Password:</span>
              <div className="flex items-center gap-2">
                <code className="bg-gray-100 px-2 py-1 rounded text-xs">admin123</code>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => copyToClipboard('admin123', 'Password')}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-blue-600 bg-blue-100 p-2 rounded">
          💡 Click the copy icons to copy credentials to clipboard
        </div>
      </CardContent>
    </Card>
  );
}
