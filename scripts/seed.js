const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Define schemas directly in the seed script to avoid TypeScript import issues
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, default: 'USD' },
  interval: { type: String, enum: ['month', 'year'], default: 'month' },
  features: [{ type: String }],
  limits: {
    monthlyDownloads: { type: Number, default: -1 },
    audioQuality: { type: String, default: 'standard' },
    storageGB: { type: Number, default: 1 }
  },
  isActive: { type: Boolean, default: true },
  stripePriceId: { type: String, default: null }
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  color: { type: String, default: '#3B82F6' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Create models
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Plan = mongoose.models.Plan || mongoose.model('Plan', PlanSchema);
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

// AudioFile Schema
const AudioFileSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, trim: true, maxlength: 1000 },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileSize: { type: Number, required: true },
  duration: { type: Number, required: true },
  format: { type: String, required: true, enum: ['mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg'] },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  tags: [{ type: String, trim: true, lowercase: true }],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPublic: { type: Boolean, default: true },
  isPremium: { type: Boolean, default: false },
  downloadCount: { type: Number, default: 0 },
  playCount: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  waveformData: { type: String },
  thumbnailUrl: { type: String },
  metadata: {
    bitrate: Number,
    sampleRate: Number,
    channels: Number,
    codec: String
  }
}, { timestamps: true });

const AudioFile = mongoose.models.AudioFile || mongoose.model('AudioFile', AudioFileSchema);

async function connectDB() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/audiostream';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

async function seedUsers() {
  try {
    console.log('🌱 Seeding users...');

    // Check if users already exist
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      console.log('👥 Users already exist, skipping user seeding');
      return;
    }

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@audiostreamPro.com',
      password: 'admin123',
      role: 'admin',
      isActive: true,
    });

    await adminUser.save();
    console.log('✅ Admin user created:', adminUser.email);

    // Create regular user
    const regularUser = new User({
      name: 'John Doe',
      email: 'user@audiostreamPro.com',
      password: 'user123',
      role: 'user',
      isActive: true,
    });

    await regularUser.save();
    console.log('✅ Regular user created:', regularUser.email);

    // Create test user
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123',
      role: 'user',
      isActive: true,
    });

    await testUser.save();
    console.log('✅ Test user created:', testUser.email);

  } catch (error) {
    console.error('❌ Error seeding users:', error);
  }
}

async function seedPlans() {
  try {
    console.log('🌱 Seeding subscription plans...');

    // Check if plans already exist
    const existingPlans = await Plan.countDocuments();
    if (existingPlans > 0) {
      console.log('💳 Plans already exist, skipping plan seeding');
      return;
    }

    const plans = [
      {
        name: 'Free',
        description: 'Perfect for getting started with basic audio streaming',
        price: 0,
        currency: 'USD',
        interval: 'month',
        features: [
          '5 downloads per month',
          'Basic audio quality',
          'Standard support',
          'Access to free library'
        ],
        limits: {
          monthlyDownloads: 5,
          audioQuality: 'standard',
          storageGB: 1
        },
        isActive: true,
        stripePriceId: null
      },
      {
        name: 'Pro',
        description: 'Ideal for content creators and audio enthusiasts',
        price: 9.99,
        currency: 'USD',
        interval: 'month',
        features: [
          '100 downloads per month',
          'High-quality audio (320kbps)',
          'Priority support',
          'Access to premium library',
          'Advanced search filters',
          'Playlist creation'
        ],
        limits: {
          monthlyDownloads: 100,
          audioQuality: 'high',
          storageGB: 10
        },
        isActive: true,
        stripePriceId: 'price_pro_monthly'
      },
      {
        name: 'Unlimited',
        description: 'For professionals who need unlimited access',
        price: 19.99,
        currency: 'USD',
        interval: 'month',
        features: [
          'Unlimited downloads',
          'Lossless audio quality',
          '24/7 premium support',
          'Access to exclusive content',
          'Advanced analytics',
          'API access',
          'Commercial license'
        ],
        limits: {
          monthlyDownloads: -1, // -1 means unlimited
          audioQuality: 'lossless',
          storageGB: 100
        },
        isActive: true,
        stripePriceId: 'price_unlimited_monthly'
      }
    ];

    for (const planData of plans) {
      const plan = new Plan(planData);
      await plan.save();
      console.log(`✅ Plan created: ${plan.name} - $${plan.price}/${plan.interval}`);
    }

  } catch (error) {
    console.error('❌ Error seeding plans:', error);
  }
}

async function seedCategories() {
  try {
    console.log('🌱 Seeding categories...');

    // Check if categories already exist
    const existingCategories = await Category.countDocuments();
    if (existingCategories > 0) {
      console.log('🎵 Categories already exist, skipping category seeding');
      return;
    }

    const categories = [
      {
        name: 'Electronic',
        description: 'Electronic music and synthesized sounds',
        slug: 'electronic',
        color: '#3B82F6',
        isActive: true
      },
      {
        name: 'Hip Hop',
        description: 'Hip hop beats and urban sounds',
        slug: 'hip-hop',
        color: '#EF4444',
        isActive: true
      },
      {
        name: 'Rock',
        description: 'Rock music and guitar-driven sounds',
        slug: 'rock',
        color: '#F59E0B',
        isActive: true
      },
      {
        name: 'Jazz',
        description: 'Jazz music and improvisational sounds',
        slug: 'jazz',
        color: '#8B5CF6',
        isActive: true
      },
      {
        name: 'Classical',
        description: 'Classical music and orchestral sounds',
        slug: 'classical',
        color: '#10B981',
        isActive: true
      },
      {
        name: 'Ambient',
        description: 'Ambient and atmospheric sounds',
        slug: 'ambient',
        color: '#06B6D4',
        isActive: true
      },
      {
        name: 'Pop',
        description: 'Pop music and mainstream sounds',
        slug: 'pop',
        color: '#EC4899',
        isActive: true
      },
      {
        name: 'Sound Effects',
        description: 'Various sound effects and audio samples',
        slug: 'sound-effects',
        color: '#6B7280',
        isActive: true
      }
    ];

    for (const categoryData of categories) {
      const category = new Category(categoryData);
      await category.save();
      console.log(`✅ Category created: ${category.name}`);
    }

  } catch (error) {
    console.error('❌ Error seeding categories:', error);
  }
}

async function seedAudioFiles() {
  try {
    console.log('🌱 Seeding sample audio files...');

    // Check if audio files already exist
    const existingAudioFiles = await AudioFile.countDocuments();
    if (existingAudioFiles > 0) {
      console.log('🎵 Audio files already exist, skipping audio file seeding');
      return;
    }

    // Get users and categories for references
    const adminUser = await User.findOne({ email: 'admin@audiostreamPro.com' });
    const regularUser = await User.findOne({ email: 'user@audiostreamPro.com' });
    const testUser = await User.findOne({ email: 'test@example.com' });

    const electronicCategory = await Category.findOne({ name: 'Electronic' });
    const hipHopCategory = await Category.findOne({ name: 'Hip Hop' });
    const ambientCategory = await Category.findOne({ name: 'Ambient' });
    const jazzCategory = await Category.findOne({ name: 'Jazz' });
    const soundEffectsCategory = await Category.findOne({ name: 'Sound Effects' });

    const sampleAudioFiles = [
      {
        title: 'Midnight Dreams',
        description: 'A dreamy electronic track perfect for late night listening',
        fileName: 'midnight-dreams.mp3',
        fileUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        fileSize: 3456789,
        duration: 180,
        format: 'mp3',
        category: electronicCategory._id,
        tags: ['electronic', 'ambient', 'chill'],
        uploadedBy: regularUser._id,
        isPublic: true,
        isPremium: false,
        downloadCount: 45,
        playCount: 234,
        likes: 12,
      },
      {
        title: 'Urban Beats',
        description: 'High-energy hip hop instrumental',
        fileName: 'urban-beats.mp3',
        fileUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        fileSize: 4567890,
        duration: 210,
        format: 'mp3',
        category: hipHopCategory._id,
        tags: ['hip-hop', 'beats', 'instrumental'],
        uploadedBy: testUser._id,
        isPublic: true,
        isPremium: true,
        downloadCount: 78,
        playCount: 456,
        likes: 23,
      },
      {
        title: 'Ocean Waves',
        description: 'Relaxing ocean sounds for meditation',
        fileName: 'ocean-waves.wav',
        fileUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        fileSize: 8901234,
        duration: 600,
        format: 'wav',
        category: ambientCategory._id,
        tags: ['nature', 'relaxation', 'meditation'],
        uploadedBy: adminUser._id,
        isPublic: true,
        isPremium: false,
        downloadCount: 156,
        playCount: 789,
        likes: 45,
      },
      {
        title: 'Jazz Piano Solo',
        description: 'Smooth jazz piano performance',
        fileName: 'jazz-piano.mp3',
        fileUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        fileSize: 5678901,
        duration: 240,
        format: 'mp3',
        category: jazzCategory._id,
        tags: ['jazz', 'piano', 'instrumental'],
        uploadedBy: regularUser._id,
        isPublic: true,
        isPremium: true,
        downloadCount: 89,
        playCount: 345,
        likes: 34,
      },
      {
        title: 'Thunder Storm',
        description: 'Dramatic thunder and rain sound effect',
        fileName: 'thunder-storm.wav',
        fileUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        fileSize: 7890123,
        duration: 300,
        format: 'wav',
        category: soundEffectsCategory._id,
        tags: ['weather', 'storm', 'nature'],
        uploadedBy: testUser._id,
        isPublic: true,
        isPremium: false,
        downloadCount: 123,
        playCount: 567,
        likes: 18,
      },
    ];

    for (const audioData of sampleAudioFiles) {
      const audioFile = new AudioFile(audioData);
      await audioFile.save();
      console.log(`✅ Audio file created: ${audioFile.title}`);
    }

  } catch (error) {
    console.error('❌ Error seeding audio files:', error);
  }
}

async function main() {
  console.log('🚀 Starting database seeding...');
  
  await connectDB();
  
  await seedUsers();
  await seedPlans();
  await seedCategories();
  await seedAudioFiles();
  
  console.log('✅ Database seeding completed!');
  console.log('\n📋 Seeded Data Summary:');
  console.log('👤 Users:');
  console.log('   - admin@audiostreamPro.com (password: admin123) - Admin');
  console.log('   - user@audiostreamPro.com (password: user123) - User');
  console.log('   - test@example.com (password: test123) - User');
  console.log('\n💳 Plans: Free, Pro ($9.99/month), Unlimited ($19.99/month)');
  console.log('🎵 Categories: Electronic, Hip Hop, Rock, Jazz, Classical, Ambient, Pop, Sound Effects');
  console.log('🎧 Sample Audio Files: 5 demo tracks with realistic stats');
  
  await mongoose.connection.close();
  console.log('\n🔌 Database connection closed');
}

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Run the seeder
main().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
