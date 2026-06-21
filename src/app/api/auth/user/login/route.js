import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../../../models/User';
import connectDB from '../../../../../config/db';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Please provide both email and password' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'matree_ayurveda_super_secret_jwt_key_2026',
      { expiresIn: '30d' }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
