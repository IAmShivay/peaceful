import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/database/connection';
import { User } from '@/lib/database/models/User';
import { AudioFile } from '@/lib/database/models/AudioFile';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get all users with their stats
    const users = await User.find({})
      .select('name email role status createdAt lastLoginAt')
      .sort({ createdAt: -1 })
      .lean();

    // Get upload and download stats for each user
    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const userAudioFiles = await AudioFile.find({ uploadedBy: user._id }).lean();
        
        return {
          id: (user._id as any).toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          status: (user as any).status || 'active',
          createdAt: user.createdAt.toISOString(),
          lastLoginAt: (user as any).lastLoginAt?.toISOString(),
          totalUploads: userAudioFiles.length,
          totalDownloads: userAudioFiles.reduce((sum: number, file: any) => sum + (file.downloadCount || 0), 0),
        };
      })
    );

    return NextResponse.json(usersWithStats);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
