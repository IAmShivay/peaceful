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

    // Get user's recent audio files
    const recentAudio = await AudioFile.find({ uploadedBy: session.user?.id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title duration playCount downloadCount createdAt')
      .lean();

    // Format the response
    const formattedAudio = recentAudio.map((audio: any) => ({
      id: audio._id.toString(),
      title: audio.title,
      duration: audio.duration,
      playCount: audio.playCount || 0,
      downloadCount: audio.downloadCount || 0,
      createdAt: audio.createdAt.toISOString(),
    }));

    return NextResponse.json(formattedAudio);
  } catch (error) {
    console.error('Error fetching user audio:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
