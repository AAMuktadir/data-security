import React from "react";
import { FaLock, FaDatabase } from "react-icons/fa";

export default function Databasetable({ user }) {
  const fields = [
    { key: "_id", label: "_id" },
    { key: "studentID", label: "studentID" },
    { key: "name", label: "name", encrypted: true },
    { key: "email", label: "email", encrypted: true },
    { key: "gender", label: "gender", encrypted: true },
    { key: "university", label: "university", encrypted: true },
    { key: "department", label: "department", encrypted: true },
    { key: "bio", label: "bio", encrypted: true },
    { key: "createdAt", label: "createdAt" },
    { key: "updatedAt", label: "updatedAt" },
    { key: "__v", label: "__v" },
  ];

  return (
    <div className="glass-strong rounded-2xl p-5 sm:p-6 overflow-x-auto">
      <div className="flex items-center gap-3 mb-5">
        <FaDatabase className="text-cyan-400" />
        <h3 className="text-white font-bold">users collection — 1 document</h3>
        <span className="status-encrypted ml-auto">🔒 Encrypted Fields</span>
      </div>

      <div className="space-y-3">
        {fields.map(({ key, label, encrypted }) => (
          <div key={key} className="glass rounded-xl p-3 flex flex-col sm:flex-row sm:items-start gap-2">
            <div className="flex items-center gap-2 sm:w-44 flex-shrink-0">
              {encrypted && <FaLock className="text-violet-400 text-xs flex-shrink-0" />}
              <span className="text-cyan-400 text-sm font-mono font-medium">{label}</span>
              {encrypted && <span className="text-violet-400/60 text-xs font-mono hidden sm:inline">(enc)</span>}
            </div>
            <span className={`break-all text-sm ${encrypted ? "encrypted-text" : "text-white/70"}`}>
              {String(user[key] ?? "")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
