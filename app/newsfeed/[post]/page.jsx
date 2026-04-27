"use client";
import React, { useEffect, useState } from "react";
import { decrypt } from "@/utils/crypto";
import { Domain } from "@/utils/constants";
import Header from "@/components/header";
import { FaArrowLeft, FaLock, FaComments, FaTrash, FaPaperPlane } from "react-icons/fa";
import Link from "next/link";

export default function Page({ params }) {
  const [comment, setComment] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const data = { post_id: selectedPost?._id, writer: userData?.name, content: comment };

    try {
      const response = await fetch(`${Domain}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const rdata = await response.json();
      if (response.ok) {
        setComment("");
        getPost();
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
      getPost();
    } catch (error) { console.log(error); }
  };

  const getPost = async () => {
    const postID = params?.post;
    try {
      const response = await fetch(`${Domain}/api/comments?id=${postID}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setSelectedPost(data.data);
    } catch (error) { console.error(error); }
  };

  const getUserInfo = async () => {
    try {
      const response = await fetch(`${Domain}/api/extractdata`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setUserData(data.data);
    } catch (error) { console.log(error); }
  };

  const getDate = (data) => {
    const date = new Date(data);
    return date.toLocaleString("en-GB", {
      hour: "numeric", minute: "numeric", hour12: true,
      day: "numeric", month: "short", year: "numeric",
    });
  };

  useEffect(() => {
    if (!Domain) return;
    getPost();
    getUserInfo();
  }, []);

  return (
    <>
      <Header />
      {!selectedPost ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
          <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
          <p className="text-white/50">Decrypting post...</p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8 pb-20">
          {/* Back Link */}
          <Link
            href="/newsfeed"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 text-sm mb-6 transition-colors group"
          >
            <FaArrowLeft className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Newsfeed
          </Link>

          {/* Post Card */}
          <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl">
            {/* Post Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="status-encrypted">🔒 AES-256 Encrypted</span>
                <span className="text-white/30 text-xs">{getDate(selectedPost.createdAt)}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {decrypt(selectedPost.title)}
              </h1>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500/40 to-violet-500/40 flex items-center justify-center text-xs font-bold text-white">
                  {decrypt(selectedPost.author).charAt(0).toUpperCase()}
                </div>
                <span className="text-white/60 text-sm">{decrypt(selectedPost.author)}</span>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-6 border-b border-white/10">
              <p className="text-white/80 text-base leading-relaxed whitespace-pre-wrap">
                {decrypt(selectedPost.content)}
              </p>
            </div>

            {/* Comments Section */}
            <div className="p-6">
              <h3 className="flex items-center gap-2 text-white font-semibold mb-4">
                <FaComments className="text-cyan-400" />
                Comments
                {selectedPost.comments?.length > 0 && (
                  <span className="text-white/40 text-sm font-normal">({selectedPost.comments.length})</span>
                )}
              </h3>

              {selectedPost.comments && selectedPost.comments.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {selectedPost.comments.map((c) => (
                    <div key={c._id} className="glass rounded-xl p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-cyan-400 text-sm font-medium">{decrypt(c.writer)}</span>
                            <span className="text-white/30 text-xs">{getDate(c.createdAt)}</span>
                          </div>
                          <p className="text-white/70 text-sm">{decrypt(c.content)}</p>
                        </div>
                        {userData?._id === selectedPost.author_id && (
                          <button
                            onClick={() => deleteComment(selectedPost._id, c._id)}
                            className="text-rose-400/60 hover:text-rose-400 transition-colors p-1 rounded-lg hover:bg-rose-400/10 flex-shrink-0"
                            aria-label="Delete comment"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 mb-6">
                  <FaComments className="text-white/20 text-4xl mx-auto mb-3" />
                  <p className="text-white/40 text-sm">No comments yet. Be the first to comment!</p>
                </div>
              )}

              {/* Comment Form */}
              <form onSubmit={handleSubmit}>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="input-glass flex-1"
                    placeholder="Write a comment... (will be encrypted)"
                    required
                  />
                  <button type="submit" className="btn-primary px-5 flex items-center gap-2">
                    <FaPaperPlane className="text-sm" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
                <p className="text-white/30 text-xs mt-2 flex items-center gap-1">
                  <FaLock className="text-xs" /> Your comment is encrypted before storage
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
