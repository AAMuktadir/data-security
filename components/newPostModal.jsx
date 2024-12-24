import React from "react";
import { useState } from "react";

export default function NewPostModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    onClose();
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 px-4 sm:px-0">
      <div className="bg-white p-4 sm:p-8 rounded-lg w-full max-w-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition duration-200 focus:outline-none"
        >
          <span className="text-2xl font-bold">&times;</span>
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Title
            </label>
            <div className="bg-gray-50 rounded-lg p-3 shadow-inner">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent text-gray-800 text-base focus:outline-none placeholder-gray-400"
                placeholder="Enter post title..."
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Content
            </label>
            <div className="bg-gray-50 rounded-lg p-3 shadow-inner h-60">
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-full bg-transparent text-gray-800 text-base focus:outline-none placeholder-gray-400"
                placeholder="Write your content here..."
                required
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-600 transition duration-200 text-lg"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
