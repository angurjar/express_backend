// db.js
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://anjali755577:eaPey2zKRgntZMSF@cluster0.dlzzf3g.mongodb.net/', {
      
      
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};


