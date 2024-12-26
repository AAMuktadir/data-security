"use client";
import React, { useEffect, useState } from "react";
import { decrypt } from "@/utils/crypto";
import { Domain } from "@/utils/constants";
import Header from "@/components/header";

export default function Page({ params }) {
  const [comment, setComment] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty comment
    if (!comment.trim()) {
      console.error("Comment cannot be empty");
      return;
    }

    const data = {
      post_id: selectedPost?._id,
      writer: userData?.name,
      content: comment,
    };

    try {
      const response = await fetch(`${Domain}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      const rdata = await response.json();

      if (!response.ok) {
        console.error(
          "Comment addition error:",
          rdata.message || "Unknown error"
        );
      } else {
        console.log("Comment successfully posted:", rdata);
        setComment(""); // Clear the input
        getPost();
      }
    } catch (error) {
      console.error("New comment addition error:", error);
    }
  };

  const deleteComment = async (post_id, comment_id) => {
    const data = {
      postID: post_id,
      commentID: comment_id,
    };
    try {
      const response = await fetch(`${Domain}/api/comments`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      getPost();
    } catch (error) {
      console.log(error);
    }
  };

  const getPost = async () => {
    const postID = params?.post; // Ensure params is accessible
    try {
      const response = await fetch(`${Domain}/api/comments?id=${postID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setSelectedPost(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch(`${Domain}/api/extractdata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!Domain) {
      return null;
    } else {
      getPost();
      getUserInfo();
    }
  }, []);

  return (
    <>
      <Header />
      {selectedPost ? (
        <div className="flex justify-center items-center">
          <div className="bg-white w-full h-full flex flex-col overflow-hidden px-4 sm:px-20 pb-12 sm:pb-16">
            <div className="p-6 border-b shadow-lg">
              <h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-800">
                {decrypt(selectedPost.title)}
              </h2>
              <p className="pt-2 text-sm font-light text-gray-700 text-center">
                {decrypt(selectedPost.author)}
              </p>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              <p className="text-gray-600 text-sm sm:text-lg leading-relaxed text-justify">
                {decrypt(selectedPost.content)}
              </p>
            </div>

            <div className="py-8 sm:py-12 shadow-lg px-4 sm:px-12">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Comments
              </h3>
              {selectedPost.comments && selectedPost.comments.length > 0 ? (
                <ul className="space-y-4">
                  {selectedPost.comments.map((comment) => (
                    <li
                      key={comment._id}
                      className="border border-gray-300 rounded-lg p-3 bg-white shadow-sm"
                    >
                      <div className="flex justify-between">
                        <div className="">
                          {/* Writer Name */}
                          <div className="flex items-center">
                            <p className="font-medium text-gray-800 text-sm">
                              {decrypt(comment.writer)}
                            </p>
                          </div>

                          {/* Comment Content */}
                          <div className="mt-1">
                            <p className="text-gray-600 text-sm">
                              {decrypt(comment.content)}
                            </p>
                          </div>
                        </div>

                        {userData?._id === selectedPost.author_id && (
                          <p
                            className="text-xs text-red-500 cursor-pointer"
                            onClick={() =>
                              deleteComment(selectedPost._id, comment._id)
                            }
                          >
                            Delete
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">
                  No comments yet. Be the first to comment!
                </p>
              )}

              <form onSubmit={handleSubmit} className="flex gap-4 w-full pt-6">
                <div className="bg-gray-100 rounded-lg p-2 shadow-inner w-full">
                  <input
                    type="text"
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-transparent text-gray-800 text-base focus:outline-none placeholder-gray-400"
                    placeholder="Comment here..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-600 transition duration-200 text-lg"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-full items-center justify-center text-xl">
          Loading
        </div>
      )}
    </>
  );
}
