import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../../../models/User.js';
import connectDB from '../../../../../config/db.js';

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: 'Please provide name, email, and password' }, { status: 400 });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ success: false, message: 'An account with this email already exists' }, { status: 400 });
    }

    const user = await User.create({ name, email, password });

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
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
