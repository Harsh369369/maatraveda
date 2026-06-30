import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { verifyUser } from '../../../../../utils/auth.js';
import connectDB from '../../../../../config/db.js';

export async function PUT(request) {
  try {
    const user = await verifyUser(request);
    await connectDB();
    
    const { name, password, address, city, state, pincode } = await request.json();

    if (name) user.name = name;
    if (address !== undefined) user.address = address;
    if (city !== undefined) user.city = city;
    if (state !== undefined) user.state = state;
    if (pincode !== undefined) user.pincode = pincode;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        city: user.city,
        state: user.state,
        pincode: user.pincode
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}
