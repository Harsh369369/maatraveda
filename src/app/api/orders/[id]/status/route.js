import { NextResponse } from 'next/server';
import Order from '../../../../../models/Order';
import { verifyAdmin } from '../../../../../utils/auth';
import connectDB from '../../../../../config/db';

export async function PUT(request, { params }) {
  try {
    await verifyAdmin(request);
    await connectDB();
    const { id } = await params;
    const { status } = await request.json();

    if (!status || !['pending', 'confirmed', 'shipped', 'delivered'].includes(status)) {
      return NextResponse.json({
        success: false,
        message: 'Please provide a valid status: pending, confirmed, shipped, or delivered'
      }, { status: 400 });
    }

    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    order.status = status;
    await order.save();

    const populatedOrder = await Order.findById(order._id).populate('items.product', 'name price images');

    return NextResponse.json({
      success: true,
      message: `Order status updated to ${status}`,
      order: populatedOrder
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}
