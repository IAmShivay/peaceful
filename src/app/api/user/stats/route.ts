import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/database/connection';
import { AudioFile } from '@/lib/database/models/AudioFile';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get user's audio files and calculate stats
    const userAudioFiles = await AudioFile.find({ uploadedBy: session.user.id });

    const stats = {
      totalUploads: userAudioFiles.length,
      totalPlays: userAudioFiles.reduce((sum, file) => sum + (file.playCount || 0), 0),
      totalDownloads: userAudioFiles.reduce((sum, file) => sum + (file.downloadCount || 0), 0),
      totalLikes: userAudioFiles.reduce((sum, file) => sum + (file.likes || 0), 0),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
