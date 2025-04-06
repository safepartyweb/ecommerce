import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('MongoDB already connected!');
    return;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  });
  console.log('MongoDB connected');
  return db;
};

export default connectMongo;
