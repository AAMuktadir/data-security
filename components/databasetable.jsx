import React from "react";

export default function Databasetable({ user }) {
  return (
    <div className="bg-gray-100 p-4 md:p-8 rounded-lg shadow-md text-wrap">
      <p className="text-lg font-bold mb-2">User Details:</p>
      <div className="space-y-4">
        <p>
          <span className="font-semibold">_id:</span> {user._id}
        </p>
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Gender:</span> {user.gender}
        </p>
        <div>
          <p className="font-semibold">Posts:</p>
          <ul className="list-disc pl-6">
            {user.posts.map((post, index) => (
              <li key={post._id} className="mb-2">
                <p>
                  <span className="font-semibold">Title:</span> {post.title}
                </p>
                <p>
                  <span className="font-semibold">Content:</span> {post.content}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <p>
          <span className="font-semibold">Created At:</span> {user.createdAt}
        </p>
        <p>
          <span className="font-semibold">Updated At:</span> {user.updatedAt}
        </p>
        <p>
          <span className="font-semibold">__v:</span> {user.__v}
        </p>
      </div>
    </div>
  );
}
