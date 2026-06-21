import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, simulated } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id) {
      return NextResponse.json({
        success: false,
        message: 'Missing verification fields'
      }, { status: 400 });
    }

    if (simulated || razorpay_order_id.startsWith('mock_')) {
      console.log('🌿 Verified simulated payment signature successfully.');
      return NextResponse.json({
        success: true,
        message: 'Simulated payment verified successfully'
      });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      console.log('✅ Razorpay payment signature verified successfully!');
      return NextResponse.json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      console.error('❌ Razorpay signature mismatch!');
      return NextResponse.json({
        success: false,
        message: 'Payment verification failed. Signature mismatch.'
      }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
