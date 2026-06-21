import { NextResponse } from 'next/server';
import Product from '../../../models/Product';
import { verifyAdmin } from '../../../utils/auth';
import connectDB from '../../../config/db';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: products.length, products });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await verifyAdmin(request);
    const {
      name,
      description,
      category,
      price,
      mrp,
      images,
      ingredients,
      benefits,
      inStock,
      isComingSoon,
      isFeatured
    } = await request.json();

    if (!name || !description || !category || !price || !mrp || !images || images.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Please provide all required fields: name, description, category, price, mrp, and at least one image'
      }, { status: 400 });
    }

    const product = await Product.create({
      name,
      description,
      category,
      price,
      mrp,
      images,
      ingredients: Array.isArray(ingredients) ? ingredients : ingredients ? [ingredients] : [],
      benefits: Array.isArray(benefits) ? benefits : benefits ? [benefits] : [],
      inStock: inStock !== undefined ? inStock : true,
      isComingSoon: isComingSoon !== undefined ? isComingSoon : false,
      isFeatured: isFeatured !== undefined ? isFeatured : false
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}
