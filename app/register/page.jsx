"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Domain } from "@/utils/constants";

export default function Page() {
  const [studentExists, setStudentExists] = useState(null);
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

  if (!Domain) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Domain}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setStudentExists(data);
      console.log(data);

      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Registration error:", data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl px-10 py-8 mt-6 bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Registration Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block" htmlFor="name">
                  Student ID
                </label>

                <input
                  type="text"
                  placeholder="Student ID"
                  name="studentID"
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />

                {studentExists != null && (
                  <p className="text-xs text-red-500">{studentExists}</p>
                )}
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block" htmlFor="name">
                  University
                </label>
                <input
                  type="text"
                  placeholder="University"
                  name="university"
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block" htmlFor="name">
                  Department
                </label>
                <input
                  type="text"
                  placeholder="Department"
                  name="department"
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mt-4">
                <label className="block" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="block">Gender</label>
                <select
                  name="gender"
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </section>

            <div className="mt-4">
              <label className="block " htmlFor="email">
                Bio
              </label>
              <input
                type="text"
                placeholder="Bio"
                name="bio"
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            <div className="mt-4">
              <label className="block" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <button
            onClick={() => (window.location.href = "/login")}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
