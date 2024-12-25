import { NextResponse } from "next/server";
import connect from "@/lib/mongodb";
import newsFeed from "@/lib/models/newsFeed";
import { encrypt } from "@/utils/crypto";

export async function POST(request) {
  const { post_id, writer, content } = await request.json();

  try {
    // Encrypt the content
    const encryptedContent = encrypt(content);

    //find post by _id
    const existingPost = await newsFeed.findById(post_id);

    if (!existingPost) {
      console.log("Post not found");
      return NextResponse.json("Post not found", {
        status: 404,
        success: false,
      });
    }

    // Add new comment
    existingPost.comments.push({
      writer: writer,
      content: encryptedContent,
    });
    existingPost.save();

    return NextResponse.json("Comment added successfully", {
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

export async function DELETE(request) {
  try {
    await connect();

    const { postID, commentID } = await request.json();

    // Find the post by postID and remove the comment with the given commentID
    const result = await newsFeed.updateOne(
      { _id: postID },
      { $pull: { comments: { _id: commentID } } }
    );

    if (result.modifiedCount > 0) {
      return NextResponse.json(
        { message: "Comment deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Comment not found or already deleted" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
