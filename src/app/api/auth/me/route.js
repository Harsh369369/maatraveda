import { NextResponse } from 'next/server';
import { verifyAdmin } from '../../../../utils/auth.js';

export async function GET(request) {
  try {
    const admin = await verifyAdmin(request);
    return NextResponse.json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}
