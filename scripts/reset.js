const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

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

async function resetDatabase() {
  try {
    console.log('🗑️  Resetting database...');
    
    // Get all collection names
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    // Drop all collections
    for (const collection of collections) {
      await mongoose.connection.db.dropCollection(collection.name);
      console.log(`✅ Dropped collection: ${collection.name}`);
    }
    
    console.log('✅ Database reset completed!');
    
  } catch (error) {
    console.error('❌ Error resetting database:', error);
  }
}

async function main() {
  console.log('🚀 Starting database reset...');
  
  await connectDB();
  await resetDatabase();
  
  console.log('\n⚠️  Database has been completely reset!');
  console.log('💡 Run "npm run db:seed" to populate with sample data');
  
  await mongoose.connection.close();
  console.log('\n🔌 Database connection closed');
}

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Run the reset
main().catch((error) => {
  console.error('❌ Reset failed:', error);
  process.exit(1);
});
