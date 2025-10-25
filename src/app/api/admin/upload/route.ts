import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/database/connection';
import { AudioFile } from '@/lib/database/models/AudioFile';
import  Category  from '@/lib/database/models/Category';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const categoryName = formData.get('category') as string;
    const tags = JSON.parse(formData.get('tags') as string || '[]');
    const isPublic = formData.get('isPublic') === 'true';
    const isPremium = formData.get('isPremium') === 'true';

    if (!file || !title) {
      return NextResponse.json({ error: 'File and title are required' }, { status: 400 });
    }

    // Find or create category
    let category = await Category.findOne({ name: categoryName });
    if (!category) {
      category = await Category.create({
        name: categoryName,
        description: `${categoryName} music and audio`,
        slug: categoryName.toLowerCase().replace(/\s+/g, '-'),
        color: '#3B82F6',
        isActive: true
      });
    }

    // In a real implementation, you would:
    // 1. Upload the file to cloud storage (AWS S3, Cloudinary, etc.)
    // 2. Extract audio metadata (duration, bitrate, etc.)
    // 3. Generate waveform data
    // 4. Create thumbnail if needed

    // For demo purposes, we'll simulate file processing
    const fileUrl = `https://example.com/audio/${Date.now()}-${file.name}`;
    const duration = Math.floor(Math.random() * 300) + 60; // Random duration between 1-6 minutes
    
    // Create audio file record
    const audioFile = await AudioFile.create({
      title,
      description,
      fileName: file.name,
      fileUrl,
      fileSize: file.size,
      duration,
      format: file.type.split('/')[1] || 'mp3',
      category: category._id,
      tags,
      uploadedBy: session.user.id,
      isPublic,
      isPremium,
      downloadCount: 0,
      playCount: 0,
      likes: 0,
      metadata: {
        bitrate: 320,
        sampleRate: 44100,
        channels: 2,
        codec: file.type.split('/')[1] || 'mp3'
      }
    });

    return NextResponse.json({
      success: true,
      audioFile: {
        id: audioFile._id,
        title: audioFile.title,
        description: audioFile.description,
        fileUrl: audioFile.fileUrl,
        duration: audioFile.duration,
        category: category.name,
        tags: audioFile.tags,
        isPublic: audioFile.isPublic,
        isPremium: audioFile.isPremium
      }
    });

  } catch (error) {
    console.error('Error uploading audio file:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
