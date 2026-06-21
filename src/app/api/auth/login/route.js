import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Admin from '../../../../models/Admin';
import connectDB from '../../../../config/db';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: 'Please provide both email and password' }, { status: 400 });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET || 'matree_ayurveda_super_secret_jwt_key_2026',
      { expiresIn: '30d' }
    );

    return NextResponse.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
