import { NextResponse } from "next/server";

import connect from "@/lib/mongodb";
import User from "@/lib/models/User";
import { HashPassword } from "@/utils/managePassword";
import { encrypt } from "@/utils/crypto";

export async function POST(req) {
  //   const data = await req.json();
  await connect();

  const {
    name,
    studentID,
    university,
    department,
    email,
    gender,
    bio,
    password,
  } = await req.json();
  try {
    // Check if the studentID already exists
    const existingUser = await User.findOne({ studentID });
    if (existingUser) {
      return NextResponse.json("Student already exists", {
        status: 400,
        success: false,
      });
    }

    const hashedPassword = await HashPassword(password);
    // Encrypt the name and gender
    const encryptedName = encrypt(name);

    const encryptedGender = encrypt(gender);
    const encryptedEmail = encrypt(email);
    const encryptedUniversity = encrypt(university);
    const encryptedDepartment = encrypt(department);
    const encryptedBio = encrypt(bio);

    // Create a new user
    const newUser = new User({
      name: encryptedName,
      email: encryptedEmail,
      university: encryptedUniversity,
      department: encryptedDepartment,
      studentID,
      bio: encryptedBio,
      password: hashedPassword,
      gender: encryptedGender,
    });
    await newUser.save();

    return NextResponse.json("User registered successfully", {
      status: 201,
      success: true,
    });
  } catch (error) {
    return NextResponse.json("Internal Server Error", {
      status: 500,
      success: false,
      error: error.message,
    });
  }
}
export async function GET() {
  return NextResponse.json("you get this", {
    status: 200,
    success: true,
  });
}
