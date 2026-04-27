import React, { useState } from "react";
import { decrypt } from "@/utils/crypto";
import { Domain } from "@/utils/constants";
import { FaTimes, FaComments, FaNewspaper, FaTrash, FaPaperPlane, FaLock } from "react-icons/fa";

export default function PostModal({ selectedPost, closeModal, userData }) {
  const [showPost, setShowPost] = useState(true);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const data = {
      post_id: selectedPost?._id,
      writer: userData?.name,
      content: comment,
    };

    try {
      const response = await fetch(`${Domain}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const rdata = await response.json();
      if (response.ok) {
        setComment("");
        window.location.reload();
      } else {
        console.error("Comment addition error:", rdata.message || "Unknown error");
      }
    } catch (error) {
      console.error("New comment addition error:", error);
    }
  };

  const deleteComment = async (post_id, comment_id) => {
    try {
      await fetch(`${Domain}/api/comments`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postID: post_id, commentID: comment_id }),
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (!selectedPost) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8">
      <div className="glass-strong rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl" style={{ maxHeight: "85vh" }}>
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="status-encrypted text-xs">🔒 Encrypted Post</span>
            </div>
            <h2 className="text-lg font-bold text-white leading-snug">
              {decrypt(selectedPost.title)}
            </h2>
            <p className="text-white/50 text-sm mt-1">by {decrypt(selectedPost.author)}</p>
          </div>
          <button
            onClick={closeModal}
            className="text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 flex-shrink-0"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setShowPost(true)}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all ${
              showPost ? "text-cyan-400 border-b-2 border-cyan-400" : "text-white/50 hover:text-white/80"
            }`}
          >
            <FaNewspaper /> Post
          </button>
          <button
            onClick={() => setShowPost(false)}
            className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-all ${
              !showPost ? "text-cyan-400 border-b-2 border-cyan-400" : "text-white/50 hover:text-white/80"
            }`}
          >
            <FaComments /> Comments {selectedPost.comments?.length > 0 && `(${selectedPost.comments.length})`}
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {showPost ? (
            <p className="text-white/70 text-sm leading-relaxed">
              {decrypt(selectedPost.content)}
            </p>
          ) : (
            <div className="space-y-3">
              {selectedPost.comments && selectedPost.comments.length > 0 ? (
                selectedPost.comments.map((c) => (
                  <div key={c._id} className="glass rounded-xl p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-cyan-400 text-sm font-medium">{decrypt(c.writer)}</p>
                        <p className="text-white/70 text-sm mt-1">{decrypt(c.content)}</p>
                      </div>
                      {userData._id === selectedPost.author_id && (
                        <button
                          onClick={() => deleteComment(selectedPost._id, c._id)}
                          className="text-rose-400/60 hover:text-rose-400 transition-colors flex-shrink-0 p-1"
                          aria-label="Delete comment"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FaComments className="text-white/20 text-4xl mx-auto mb-3" />
                  <p className="text-white/40 text-sm">No comments yet. Be the first!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Comment Input */}
        {!showPost && (
          <div className="p-4 border-t border-white/10">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="input-glass flex-1 py-2"
                placeholder="Add a comment... (will be encrypted)"
                required
              />
              <button type="submit" className="btn-primary px-4 py-2 flex items-center gap-2">
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
            <p className="text-white/30 text-xs mt-2 flex items-center gap-1">
              <FaLock className="text-xs" /> Comments are encrypted with AES-256
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
