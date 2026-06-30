import { NextResponse } from 'next/server';
import Order from '../../../models/Order.js';
import Product from '../../../models/Product.js';
import { verifyAdmin } from '../../../utils/auth.js';
import connectDB from '../../../config/db.js';

export async function POST(request) {
  try {
    await connectDB();
    const {
      customerName,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      items,
      totalAmount,
      orderedViaWhatsApp,
      paymentMethod
    } = await request.json();

    if (!customerName || !phone || !address || !city || !state || !pincode || !items || items.length === 0 || !totalAmount) {
      return NextResponse.json({
        success: false,
        message: 'Please provide all required fields including address and cart items'
      }, { status: 400 });
    }

    const verifiedItems = [];
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return NextResponse.json({
          success: false,
          message: `Product with ID ${item.product} not found`
        }, { status: 404 });
      }
      verifiedItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });
    }

    const order = await Order.create({
      customerName,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      items: verifiedItems,
      totalAmount,
      orderedViaWhatsApp: orderedViaWhatsApp !== undefined ? orderedViaWhatsApp : true,
      status: 'pending',
      paymentMethod: paymentMethod || 'WhatsApp Checkout'
    });

    const populatedOrder = await Order.findById(order._id).populate('items.product', 'name');

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order: populatedOrder
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await verifyAdmin(request);
    await connectDB();
    const orders = await Order.find()
      .populate('items.product', 'name price images')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}
