"use client";
import React, { useState } from "react";
import Logout from "./logout";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ name }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/newsfeed", label: "Newsfeed" },
    { href: "/database", label: "Database" },
  ];

  return (
    <header className="sticky top-0 z-40 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:px-8">
        {/* Logo + Page Title */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-sm font-bold text-white shadow-lg glow-cyan">
              DS
            </div>
          </Link>
          {name && (
            <span className="text-white/80 font-medium text-sm hidden sm:block">
              {name}
            </span>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                pathname === href
                  ? "bg-white/10 text-cyan-400 border border-cyan-400/30"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="ml-2">
            <Logout />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="md:hidden text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden glass border-t border-white/10 px-4 py-4 space-y-2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname === href
                  ? "bg-white/10 text-cyan-400 border border-cyan-400/30"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-1">
            <Logout />
          </div>
        </nav>
      )}
    </header>
  );
}
