import React from "react";

export default function PostDatabase(postData) {
  console.log(postData);
  return (
    <div className="bg-gray-100 p-4 md:p-8 rounded-lg shadow-md text-wrap">
      {postData &&
        postData.posts.map((post, index) => (
          <div key={post._id} className="post-item my-4">
            <h3 className="font-bold">Post {index + 1}</h3>

            <p className="break-words">
              <span className="font-semibold">_id: </span>{" "}
              {post._id || "Unknown"}
            </p>
            <p className="break-words">
              <span className="font-semibold">author: </span>{" "}
              {post.author || "Unknown"}
            </p>

            <p className="break-words">
              <span className="font-semibold">author_id: </span>{" "}
              {post.author_id || "Unknown"}
            </p>
            <p className="break-words">
              <span className="font-semibold">title: </span>{" "}
              {post.title || "No Title"}
            </p>
            <p className="break-words">
              <span className="font-semibold">content: </span>{" "}
              {post.content || "No Content"}
            </p>

            <p className="break-words">
              <span className="font-semibold">createdAt: </span>{" "}
              {post.createdAt || "Unknown"}
            </p>

            <p className="break-words">
              <span className="font-semibold">updatedAt: </span>{" "}
              {post.updatedAt || "Unknown"}
            </p>
          </div>
        ))}
    </div>
  );
}
