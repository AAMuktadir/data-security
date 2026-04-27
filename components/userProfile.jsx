import React from "react";
import { decrypt } from "@/utils/crypto";
import { FaLock, FaLockOpen, FaEdit, FaUser, FaEnvelope, FaIdCard, FaUniversity, FaBookOpen, FaVenusMars, FaInfoCircle } from "react-icons/fa";

const ProfileField = ({ icon: Icon, label, value, isEncrypted }) => (
  <div className="glass rounded-xl p-4 group">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="text-cyan-400 text-sm" />
      <span className="text-white/50 text-xs font-medium uppercase tracking-wider">{label}</span>
      {isEncrypted !== undefined && (
        <span className={isEncrypted ? "status-encrypted ml-auto" : "status-decrypted ml-auto"}>
          {isEncrypted ? "🔒 Encrypted" : "🔓 Decrypted"}
        </span>
      )}
    </div>
    <p className={isEncrypted ? "encrypted-text" : "text-white font-medium text-sm break-words"}>
      {value}
    </p>
  </div>
);

export default function UserProfile({ userData, showEncrypted, setShowEncrypted, setIsModalOpen }) {
  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto" />
          <p className="text-white/50">Loading your secure profile...</p>
        </div>
      </div>
    );
  }

  const fields = [
    { icon: FaUser, label: "Name", key: "name", encrypted: true },
    { icon: FaIdCard, label: "Student ID", key: "studentID", encrypted: false },
    { icon: FaEnvelope, label: "Email", key: "email", encrypted: true },
    { icon: FaVenusMars, label: "Gender", key: "gender", encrypted: true },
    { icon: FaUniversity, label: "University", key: "university", encrypted: true },
    { icon: FaBookOpen, label: "Department", key: "department", encrypted: true },
    { icon: FaInfoCircle, label: "Bio", key: "bio", encrypted: true },
  ];

  return (
    <main className="min-h-screen px-4 sm:px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header Card */}
        <div className="glass-strong rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                {decrypt(userData.name).charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{decrypt(userData.name)}</h1>
                <p className="text-white/50 text-sm">{userData.studentID}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEncrypted(!showEncrypted)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  showEncrypted
                    ? "bg-violet-500/20 border-violet-500/40 text-violet-300 hover:bg-violet-500/30"
                    : "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30"
                }`}
              >
                {showEncrypted ? <FaLock /> : <FaLockOpen />}
                {showEncrypted ? "Show Decrypted" : "Show Encrypted"}
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all"
              >
                <FaEdit />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Encryption Status Banner */}
        <div className={`rounded-xl px-4 py-3 flex items-center gap-3 border transition-all ${
          showEncrypted
            ? "bg-violet-500/10 border-violet-500/30"
            : "bg-emerald-500/10 border-emerald-500/30"
        }`}>
          {showEncrypted ? (
            <>
              <FaLock className="text-violet-400 flex-shrink-0" />
              <span className="text-violet-300 text-sm">Viewing raw encrypted data as stored in the database (AES-256)</span>
            </>
          ) : (
            <>
              <FaLockOpen className="text-emerald-400 flex-shrink-0" />
              <span className="text-emerald-300 text-sm">Viewing decrypted data — fields are decrypted client-side using AES-256</span>
            </>
          )}
        </div>

        {/* Profile Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map(({ icon, label, key, encrypted }) => (
            <ProfileField
              key={key}
              icon={icon}
              label={label}
              value={
                encrypted && showEncrypted
                  ? userData[key]
                  : encrypted
                  ? decrypt(userData[key])
                  : userData[key]
              }
              isEncrypted={encrypted ? showEncrypted : undefined}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
