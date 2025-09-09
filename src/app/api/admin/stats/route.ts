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

    // Get current date for today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Fetch stats
    const [
      totalUsers,
      totalAudioFiles,
      newUsersToday,
      activeUsers
    ] = await Promise.all([
      User.countDocuments(),
      AudioFile.countDocuments(),
      User.countDocuments({ 
        createdAt: { $gte: today, $lt: tomorrow } 
      }),
      User.countDocuments({ 
        lastLoginAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } 
      })
    ]);

    // Calculate total downloads (sum of download counts from all audio files)
    const downloadStats = await AudioFile.aggregate([
      {
        $group: {
          _id: null,
          totalDownloads: { $sum: '$downloadCount' },
          downloadsToday: {
            $sum: {
              $cond: [
                { $gte: ['$updatedAt', today] },
                '$downloadCount',
                0
              ]
            }
          }
        }
      }
    ]);

    const totalDownloads = downloadStats[0]?.totalDownloads || 0;
    const downloadsToday = downloadStats[0]?.downloadsToday || 0;

    // Calculate revenue (this would be from subscription data in a real app)
    const totalRevenue = totalUsers * 9.99; // Assuming $9.99 per user
    const revenueToday = newUsersToday * 9.99;

    const stats = {
      totalUsers,
      totalAudioFiles,
      totalDownloads,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      activeUsers,
      newUsersToday,
      downloadsToday,
      revenueToday: Math.round(revenueToday * 100) / 100,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
