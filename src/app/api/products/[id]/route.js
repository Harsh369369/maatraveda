import { NextResponse } from 'next/server';
import Product from '../../../../models/Product.js';
import { verifyAdmin } from '../../../../utils/auth.js';
import connectDB from '../../../../config/db.js';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await verifyAdmin(request);
    await connectDB();
    const { id } = await params;
    let product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    const fieldsToUpdate = await request.json();
    Object.keys(fieldsToUpdate).forEach(key => {
      if (fieldsToUpdate[key] !== undefined) {
        product[key] = fieldsToUpdate[key];
      }
    });

    await product.save();
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await verifyAdmin(request);
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    await Product.deleteOne({ _id: id });
    return NextResponse.json({ success: true, message: 'Product successfully deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}
