import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });

    cookies().set("token", "", {
      httpOnly: true,
      secure: true,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
