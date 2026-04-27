import React from "react";
import { FaTrash, FaTimes } from "react-icons/fa";

export default function ConfirmDelete({ isOpen, onClose, onConfirm, postId }) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(postId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="glass-strong rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
            <FaTrash className="text-rose-400" />
          </div>
          <h3 className="text-lg font-bold text-white">Delete Post</h3>
        </div>
        <p className="text-white/60 text-sm mb-6">
          Are you sure you want to delete this post? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={handleConfirm} className="btn-danger flex-1 py-2.5 flex items-center justify-center gap-2">
            <FaTrash className="text-sm" /> Delete
          </button>
          <button onClick={onClose} className="btn-ghost flex-1 py-2.5 flex items-center justify-center gap-2">
            <FaTimes className="text-sm" /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
