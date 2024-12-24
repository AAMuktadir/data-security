"use client";
import React, { useState } from "react";
import Logout from "./logout";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ name }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 shadow-lg w-full">
      {/* Desktop Header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm sm:text-lg font-bold text-center">
            CSE447
          </div>
          <h4 className="text-lg sm:text-xl font-semibold text-gray-800">
            {name}
          </h4>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            href="/"
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
              pathname === "/"
                ? "bg-gray-800 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            Home
          </Link>
          <Link
            href="/newsfeed"
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
              pathname === "/newsfeed"
                ? "bg-gray-800 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            Newsfeed
          </Link>
          <Link
            href="/database"
            className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
              pathname === "/database"
                ? "bg-gray-800 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-300"
            }`}
          >
            Database
          </Link>
          <Logout />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="md:hidden flex items-center justify-center text-gray-800 p-3"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-100 text-center shadow-lg py-4">
          <Link
            href="/"
            className={`block px-5 py-3 rounded-full mx-4 my-2 font-medium text-sm transition-all ${
              pathname === "/"
                ? "bg-gray-800 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/newsfeed"
            className={`block px-5 py-3 rounded-full mx-4 my-2 font-medium text-sm transition-all ${
              pathname === "/newsfeed"
                ? "bg-gray-800 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Newsfeed
          </Link>
          <Link
            href="/database"
            className={`block px-5 py-3 rounded-full mx-4 my-2 font-medium text-sm transition-all ${
              pathname === "/database"
                ? "bg-gray-800 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Database
          </Link>
          <Logout />
        </nav>
      )}
    </header>
  );
}
