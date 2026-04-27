"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Domain } from "@/utils/constants";
import { FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
  const [studentExists, setStudentExists] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    studentID: "",
    university: "",
    department: "",
    email: "",
    gender: "",
    bio: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  if (!Domain) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password) => {
    return password.length >= 6 && /^(?=.*[a-zA-Z])(?=.*\d).+$/.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${Domain}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setStudentExists(data);
      if (response.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "input-glass";
  const labelClass = "block text-sm font-medium text-white/70 mb-2";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 mb-4 shadow-lg glow-violet">
            <FaShieldAlt className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">Create Account</h1>
          <p className="text-white/50 text-sm">Join the secure data platform</p>
        </div>

        {/* Form Card */}
        <div className="glass-strong rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Name</label>
                <input type="text" name="name" placeholder="Full name" onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Student ID</label>
                <input type="text" name="studentID" placeholder="Student ID" onChange={handleChange} className={inputClass} required />
                {studentExists && typeof studentExists === "string" && (
                  <p className="text-rose-400 text-xs mt-1">{studentExists}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>University</label>
                <input type="text" name="university" placeholder="University" onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Department</label>
                <input type="text" name="department" placeholder="Department" onChange={handleChange} className={inputClass} required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" name="email" placeholder="Email address" onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label className={labelClass}>Gender</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  className="input-glass"
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" className="bg-[#0d0d2b]">Select Gender</option>
                  <option value="male" className="bg-[#0d0d2b]">Male</option>
                  <option value="female" className="bg-[#0d0d2b]">Female</option>
                  <option value="other" className="bg-[#0d0d2b]">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Bio</label>
              <input type="text" name="bio" placeholder="A short bio about you" onChange={handleChange} className={inputClass} required />
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  onChange={handleChange}
                  className={`${inputClass} pr-10`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formData.password && !validatePassword(formData.password) && (
                <p className="text-amber-400 text-xs mt-1">
                  Password must be at least 6 characters with a letter and a number.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Registering...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/50 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
