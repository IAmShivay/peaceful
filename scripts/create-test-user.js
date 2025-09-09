const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Define User schema
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

const User = mongoose.model('User', UserSchema);

async function createTestUser() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('🗑️ Cleared existing users');

    // Hash password manually
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('demo123', salt);

    // Create demo user
    const demoUser = new User({
      name: 'Demo User',
      email: 'demo@example.com',
      password: hashedPassword,
      role: 'user',
      isActive: true,
    });

    await demoUser.save();
    console.log('✅ Demo user created:', demoUser.email);

    // Create admin user
    const adminHashedPassword = await bcrypt.hash('admin123', salt);
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminHashedPassword,
      role: 'admin',
      isActive: true,
    });

    await adminUser.save();
    console.log('✅ Admin user created:', adminUser.email);

    // Test password comparison
    const testUser = await User.findOne({ email: 'demo@example.com' });
    if (testUser) {
      const isMatch = await bcrypt.compare('demo123', testUser.password);
      console.log('🔐 Password test for demo user:', isMatch ? '✅ PASS' : '❌ FAIL');
    }

    console.log('\n📋 Demo Credentials:');
    console.log('👤 Regular User:');
    console.log('   Email: demo@example.com');
    console.log('   Password: demo123');
    console.log('\n👑 Admin User:');
    console.log('   Email: admin@example.com');
    console.log('   Password: admin123');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

createTestUser();
