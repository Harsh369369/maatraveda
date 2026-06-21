import { NextResponse } from 'next/server';
import Subscriber from '../../../models/Subscriber';
import { verifyAdmin } from '../../../utils/auth';
import connectDB from '../../../config/db';

export async function POST(request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Please provide an email address' }, { status: 400 });
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return NextResponse.json({
        success: false,
        message: 'This email is already subscribed to our wellness newsletter!'
      }, { status: 400 });
    }

    await Subscriber.create({ email });

    return NextResponse.json({
      success: true,
      message: '🌱 Thank you for subscribing! Welcome to the Matree wellness family.'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await verifyAdmin(request);
    await connectDB();
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });

    return NextResponse.json({
      success: true,
      count: subscribers.length,
      subscribers
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}
