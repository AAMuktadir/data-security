"use client";
import React from "react";
import Logout from "./logout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header({ name }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="bg-gray-300 w-full flex items-center justify-between py-6 px-12">
      <h4 className={`${pathname == "/posts" ? "text-3xl" : "text-xl"}`}>
        {name}
      </h4>
      <div className="md:flex gap-8 hidden">
        <Link
          href="/"
          className={`bg-yellow-300 p-2 hover:bg-yellow-600 hover:text-white duration-300 ${
            pathname == "/" ? "hidden" : ""
          }`}
        >
          Home
        </Link>

        <Link
          href="/newsfeed"
          className={`bg-yellow-300 p-2 hover:bg-yellow-600 hover:text-white duration-300 ${
            pathname == "/newsfeed" ? "hidden" : ""
          }`}
        >
          Newsfeed
        </Link>

        <Link
          href="/posts"
          className={`bg-yellow-300 p-2 hover:bg-yellow-600 hover:text-white duration-300 ${
            pathname == "/posts" ? "hidden" : ""
          }`}
        >
          See your posts
        </Link>
        <Link
          href="/database"
          className={`bg-yellow-300 p-2 hover:bg-yellow-600 hover:text-white duration-300 ${
            pathname == "/database" ? "hidden" : ""
          }`}
        >
          Database
        </Link>
        <Logout />
      </div>
      <button
        className="md:hidden flex items-center justify-center p-3"
        onClick={() => setMenuOpen(!isMenuOpen)}
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
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } flex-col fixed inset-0 bg-gray-300 p-8 md:hidden text-center`}
      >
        <Link
          href="/"
          className={`bg-yellow-300 p-2 mb-2 hover:bg-yellow-600 hover:text-white duration-300 ${
            pathname == "/" ? "hidden" : ""
          }`}
        >
          Home
        </Link>

        <Link
          href="/newsfeed"
          className={`bg-yellow-300 p-2 mb-2 hover:bg-yellow-600 hover:text-white duration-300 ${
            pathname == "/newsfeed" ? "hidden" : ""
          }`}
        >
          Newsfeed
        </Link>
        <Link
          href="/posts"
          className={`bg-yellow-300 p-2 mb-2 hover:bg-yellow-600 hover:text-white duration-300 ${
            pathname == "/posts" ? "hidden" : ""
          }`}
        >
          See your posts
        </Link>
        <Link
          href="/database"
          className={`bg-yellow-300 p-2 mb-2 hover:bg-yellow-600 hover:text-white duration-300 ${
            pathname == "/database" ? "hidden" : ""
          }`}
        >
          Database
        </Link>
        <Logout />
      </div>
    </div>
  );
}
