import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import newsFeed from "@/lib/models/newsFeed";
import { encrypt } from "@/utils/crypto";

export async function POST(request) {
  await connect();

  const { author, author_id, title, content } = await request.json();

  try {
    // Encrypt the title and content
    const encryptedTitle = encrypt(title);
    const encryptedContent = encrypt(content);

    const newFeed = new newsFeed({
      author,
      author_id,
      title: encryptedTitle,
      content: encryptedContent,
    });
    await newFeed.save();

    return NextResponse.json("Newsfeed added successfully", {
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
  try {
    await connect();
    const newsfeed = await newsFeed.find();
    return NextResponse.json(
      { message: "Newsfeed found", data: newsfeed },
      {
        status: 200,
        success: true,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    await connect();
    const { postID } = await request.json();
    await newsFeed.findOneAndDelete({ _id: postID });
    return NextResponse.json(
      { message: "Newsfeed deleted" },
      {
        status: 200,
        success: true,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
