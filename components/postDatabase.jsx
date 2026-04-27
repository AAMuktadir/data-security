import React from "react";
import { FaLock, FaDatabase, FaNewspaper } from "react-icons/fa";

export default function PostDatabase({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="glass-strong rounded-2xl p-12 text-center">
        <FaNewspaper className="text-white/20 text-5xl mx-auto mb-4" />
        <p className="text-white/40">No posts in the database yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {posts.map((post, index) => {
        const fields = [
          { key: "_id", label: "_id" },
          { key: "author_id", label: "author_id" },
          { key: "author", label: "author", encrypted: true },
          { key: "title", label: "title", encrypted: true },
          { key: "content", label: "content", encrypted: true },
          { key: "createdAt", label: "createdAt" },
          { key: "updatedAt", label: "updatedAt" },
        ];

        return (
          <div key={post._id} className="glass-strong rounded-2xl p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <FaDatabase className="text-cyan-400" />
              <h3 className="text-white font-bold">Post {index + 1}</h3>
              <span className="status-encrypted ml-auto">🔒 Encrypted</span>
            </div>
            <div className="space-y-3">
              {fields.map(({ key, label, encrypted }) => (
                <div key={key} className="glass rounded-xl p-3 flex flex-col sm:flex-row sm:items-start gap-2">
                  <div className="flex items-center gap-2 sm:w-40 flex-shrink-0">
                    {encrypted && <FaLock className="text-violet-400 text-xs flex-shrink-0" />}
                    <span className="text-cyan-400 text-sm font-mono font-medium">{label}</span>
                  </div>
                  <span className={`break-all text-sm ${encrypted ? "encrypted-text" : "text-white/70"}`}>
                    {String(post[key] ?? "")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
