import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

let razorpay;
try {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID !== 'rzp_test_DUMMY_KEY') {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
} catch (error) {
  console.error('Failed to initialize Razorpay SDK:', error.message);
}

export async function POST(request) {
  try {
    const { amount } = await request.json();

    if (!amount) {
      return NextResponse.json({
        success: false,
        message: 'Please specify the payment amount'
      }, { status: 400 });
    }

    const amountInPaise = Math.round(Number(amount) * 100);

    if (razorpay && process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_ID.includes('dummy') && !process.env.RAZORPAY_KEY_ID.includes('test_matree')) {
      try {
        const options = {
          amount: amountInPaise,
          currency: 'INR',
          receipt: `rcpt_order_${Date.now()}`
        };

        const razorpayOrder = await razorpay.orders.create(options);
        return NextResponse.json({
          success: true,
          simulated: false,
          keyId: process.env.RAZORPAY_KEY_ID,
          order: razorpayOrder
        }, { status: 201 });
      } catch (err) {
        console.warn('Razorpay SDK Order creation failed. Falling back to simulation mode.', err.message);
      }
    }

    // Fallback/Simulation Mode for testing offline
    console.log('🌿 Serving simulated Razorpay order for test-mode checkout.');
    const simulatedOrder = {
      id: `mock_order_${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      amount: amountInPaise,
      currency: 'INR',
      receipt: `rcpt_mock_${Date.now()}`,
      status: 'created'
    };

    return NextResponse.json({
      success: true,
      simulated: true,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_matree_key',
      order: simulatedOrder
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
