import { NextResponse } from 'next/server';
import { verifyUser } from '../../../../../utils/auth.js';
import Order from '../../../../../models/Order.js';
import connectDB from '../../../../../config/db.js';

export async function GET(request) {
  try {
    const user = await verifyUser(request);
    await connectDB();
    const orders = await Order.find({ email: user.email }).populate('items.product', 'name price images');
    return NextResponse.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}
