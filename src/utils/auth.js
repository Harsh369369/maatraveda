import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import User from '../models/User';
import connectDB from '../config/db';

export async function verifyAdmin(request) {
  await connectDB();
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Not authorized, token missing');
  }
  
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'matree_ayurveda_super_secret_jwt_key_2026');
  
  const adminUser = await Admin.findById(decoded.id);
  if (!adminUser) {
    throw new Error('Not authorized, admin not found');
  }
  return adminUser;
}

export async function verifyUser(request) {
  await connectDB();
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Not authorized, token missing');
  }
  
  const token = authHeader.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'matree_ayurveda_super_secret_jwt_key_2026');
  
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error('Not authorized, user not found');
  }
  return user;
}
