import React, { useState } from "react";
import { FaTimes, FaLock } from "react-icons/fa";

export default function NewPostModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="glass-strong rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
          aria-label="Close modal"
        >
          <FaTimes className="text-lg" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center">
            <FaLock className="text-white text-sm" />
          </div>
          <h2 className="text-xl font-bold text-white">New Encrypted Post</h2>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-4 py-2 mb-5 text-cyan-400 text-xs flex items-center gap-2">
          <FaLock className="flex-shrink-0" />
          Your post title and content will be AES-256 encrypted before storage.
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white/70 mb-2">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-glass"
              placeholder="Enter post title..."
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-white/70 mb-2">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input-glass resize-none"
              style={{ height: "10rem" }}
              placeholder="Write your content here..."
              required
            />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="submit" className="btn-primary flex-1 py-2.5">
              Encrypt &amp; Publish
            </button>
            <button type="button" onClick={onClose} className="btn-ghost py-2.5 px-6">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
