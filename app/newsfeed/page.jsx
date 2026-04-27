"use client";
import React, { useState, useEffect } from "react";
import NewPostModal from "@/components/newPostModal";
import Header from "@/components/header";
import { decrypt } from "@/utils/crypto";
import { Domain } from "@/utils/constants";
import ConfirmDelete from "@/components/newsfeed/confirmDelete";
import PostModal from "@/components/newsfeed/postModal";
import Link from "next/link";
import { FaPlus, FaLock, FaTrash, FaEye, FaBolt, FaComments } from "react-icons/fa";

export default function Page() {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [feedData, setFeedData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  const openDeleteModal = (postId) => { setCurrentPostId(postId); setIsDeleteModalOpen(true); };
  const closeDeleteModal = () => { setIsDeleteModalOpen(false); setCurrentPostId(null); };
  const handleConfirm = (postId) => { deleteANewsfeed(postId); };
  const openModal = (post) => setSelectedPost(post);
  const closeModal = () => setSelectedPost(null);

  const getNewsfeed = async () => {
    try {
      const response = await fetch(`${Domain}/api/newsfeed`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setFeedData(data.data);
    } catch (error) { console.log(error); }
  };

  const deleteANewsfeed = async (post_id) => {
    try {
      await fetch(`${Domain}/api/newsfeed`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postID: post_id }),
      });
      getNewsfeed();
    } catch (error) { console.log(error); }
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

  const handleSubmit = async (postData) => {
    const data = { author: userData.name, author_id: userData._id, ...postData };
    try {
      const response = await fetch(`${Domain}/api/newsfeed`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const rdata = await response.json();
      if (!response.ok) {
        console.error("New post addition error:", rdata.message);
      } else {
        getNewsfeed();
      }
    } catch (error) { console.error("New post addition error:", error); }
  };

  const getDate = (data) => {
    const date = new Date(data);
    return date.toLocaleString("en-GB", {
      day: "numeric", month: "short", year: "numeric",
      hour: "numeric", minute: "numeric", hour12: true,
    });
  };

  useEffect(() => {
    if (!Domain) return;
    getUserInfo();
    getNewsfeed();
  }, []);

  return (
    <div className="pb-20">
      <Header name="Newsfeed" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Secure Newsfeed</h1>
            <p className="text-white/50 text-sm mt-1">All posts are AES-256 encrypted at rest</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2 py-2.5 px-5 self-start sm:self-auto"
          >
            <FaPlus className="text-sm" /> New Post
          </button>
        </div>

        {/* Encryption notice */}
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-4 py-3 mb-6 text-cyan-400 text-xs flex items-center gap-2">
          <FaLock className="flex-shrink-0" />
          Posts are decrypted client-side. Database stores only encrypted ciphertext.
        </div>

        {/* Feed */}
        {feedData === null ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-white/50">Loading encrypted feed...</p>
          </div>
        ) : feedData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <FaLock className="text-white/20 text-5xl" />
            <h3 className="text-white/60 text-lg font-medium">No posts yet</h3>
            <p className="text-white/40 text-sm">Be the first to create a secure encrypted post.</p>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary mt-2 flex items-center gap-2 py-2 px-5">
              <FaPlus className="text-sm" /> Create First Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {feedData.map((post, index) => (
              <div key={index} className="glass-card p-5 flex flex-col gap-3">
                {/* Card Header */}
                <div className="flex items-center justify-between">
                  <span className="status-encrypted">🔒 Encrypted</span>
                  <span className="text-white/40 text-xs">{getDate(post.createdAt)}</span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500/40 to-violet-500/40 flex items-center justify-center text-xs font-bold text-white">
                    {decrypt(post.author).charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white/70 text-sm font-medium">{decrypt(post.author)}</span>
                </div>

                {/* Title + Content */}
                <div className="flex-1">
                  <h2 className="text-white font-semibold text-base mb-1 line-clamp-1">
                    {decrypt(post.title)}
                  </h2>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-3">
                    {decrypt(post.content)}
                  </p>
                </div>

                {/* Comment count */}
                {post.comments && post.comments.length > 0 && (
                  <div className="flex items-center gap-1 text-white/40 text-xs">
                    <FaComments /> {post.comments.length} comment{post.comments.length !== 1 ? "s" : ""}
                  </div>
                )}

                <div className="divider" />

                {/* Actions */}
                <div className="flex items-center justify-between gap-2">
                  {post.author_id === userData?._id && (
                    <button
                      onClick={() => openDeleteModal(post._id)}
                      className="btn-danger text-xs py-1.5 px-3 flex items-center gap-1"
                    >
                      <FaTrash className="text-xs" /> Delete
                    </button>
                  )}
                  <div className="flex items-center gap-2 ml-auto">
                    <Link
                      href={`/newsfeed/${post._id}`}
                      className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors px-2 py-1.5 rounded-lg hover:bg-cyan-400/10"
                    >
                      <FaEye className="text-xs" /> View
                    </Link>
                    <button
                      onClick={() => openModal(post)}
                      className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors px-2 py-1.5 rounded-lg hover:bg-violet-400/10"
                    >
                      <FaBolt className="text-xs" /> Quick
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <NewPostModal onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
      )}
      <ConfirmDelete
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirm}
        postId={currentPostId}
      />
      {selectedPost && (
        <PostModal selectedPost={selectedPost} closeModal={closeModal} userData={userData} />
      )}
    </div>
  );
}
