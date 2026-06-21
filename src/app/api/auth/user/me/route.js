import { NextResponse } from 'next/server';
import { verifyUser } from '../../../../../utils/auth';

export async function GET(request) {
  try {
    const user = await verifyUser(request);
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}
