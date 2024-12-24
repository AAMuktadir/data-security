import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import User from "@/lib/models/User";
import { encrypt } from "@/utils/crypto";

export async function PATCH(request) {
  await connect();

  const { userId, name, email, university, department, gender, bio } =
    await request.json();

  try {
    // Find the user by userId
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return NextResponse.json("User not found", {
        status: 404,
        success: false,
      });
    }

    // Update user fields if provided
    if (name) existingUser.name = encrypt(name);
    if (email) existingUser.email = encrypt(email);
    if (university) existingUser.university = encrypt(university);
    if (department) existingUser.department = encrypt(department);
    if (bio) existingUser.bio = encrypt(bio);
    if (gender) existingUser.gender = encrypt(gender);

    // Save the updated user
    await existingUser.save();

    return NextResponse.json("User updated successfully", {
      status: 200,
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

export async function POST(request) {
  await connect();

  const { _id, title, content } = await request.json();

  try {
    // Find the user by userId
    const existingUser = await User.findById(_id);
    if (!existingUser) {
      console.log("user not found");
      return NextResponse.json("User not found", {
        status: 404,
        success: false,
      });
    }

    // Encrypt the title and content
    const encryptedTitle = encrypt(title);
    const encryptedContent = encrypt(content);

    // Add new post
    existingUser.posts.push({
      title: encryptedTitle,
      content: encryptedContent,
    });

    // Save the updated user
    await existingUser.save();

    return NextResponse.json("New post added successfully", {
      status: 200,
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
