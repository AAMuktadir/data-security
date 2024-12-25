import React, { useState } from "react";
import { decrypt } from "@/utils/crypto";
import { Domain } from "@/utils/constants";

export default function PostModal({ selectedPost, closeModal, userData }) {
  const [showPost, setShowPost] = useState(true);
  const [comment, setComment] = useState("");

  const handlePost = () => {
    if (!showPost) {
      setShowPost(true);
    } else setShowPost(false);
  };

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
        window.location.reload();
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
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {selectedPost && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 px-4 sm:px-6 py-12 sm:py-0">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl h-full sm:h-96 flex flex-col overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-center text-2xl font-semibold text-gray-800">
                {decrypt(selectedPost.title)}
              </h2>
            </div>
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {showPost ? (
                <p className="text-gray-600 text-sm leading-relaxed text-justify">
                  {decrypt(selectedPost.content)}
                </p>
              ) : (
                <div className="">
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

                            {userData._id === selectedPost.author_id && (
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

                  <form
                    onSubmit={handleSubmit}
                    className="flex gap-4 w-full pt-2"
                  >
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
              )}
            </div>

            <div className="p-4 border-t text-center flex justify-center gap-8">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                onClick={closeModal}
              >
                Close
              </button>

              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                onClick={handlePost}
              >
                {showPost ? "Comments" : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
