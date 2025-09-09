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

    // Get recent activity from the last 24 hours
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Fetch recent users
    const recentUsers = await User.find({
      createdAt: { $gte: yesterday }
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .select('name email createdAt');

    // Fetch recent audio uploads
    const recentAudioFiles = await AudioFile.find({
      createdAt: { $gte: yesterday }
    })
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('uploadedBy', 'name')
    .select('title uploadedBy createdAt');

    // Combine and format activity
    const activity: any[] = [];

    // Add user registrations
    recentUsers.forEach(user => {
      activity.push({
        id: `user-${user._id}`,
        type: 'user_registered',
        message: `New user ${user.name} registered`,
        timestamp: user.createdAt.toISOString(),
        user: user.name
      });
    });

    // Add audio uploads
    recentAudioFiles.forEach(audio => {
      activity.push({
        id: `audio-${audio._id}`,
        type: 'audio_uploaded',
        message: `${audio.uploadedBy?.name || 'Unknown user'} uploaded "${audio.title}"`,
        timestamp: audio.createdAt.toISOString(),
        user: audio.uploadedBy?.name
      });
    });

    // Sort by timestamp (most recent first)
    activity.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Return only the most recent 10 activities
    return NextResponse.json(activity.slice(0, 10));
  } catch (error) {
    console.error('Error fetching admin activity:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
