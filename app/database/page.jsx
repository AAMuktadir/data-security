"use client";
import React, { useState, useEffect } from "react";
import { Domain } from "@/utils/constants";
import Databasetable from "@/components/databasetable";
import Header from "@/components/header";
import PostDatabase from "@/components/postDatabase";
import { FaUser, FaNewspaper, FaDatabase } from "react-icons/fa";

export default function Database() {
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [userSelected, setUserSelected] = useState(true);

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

  const getNewsfeed = async () => {
    try {
      const response = await fetch(`${Domain}/api/newsfeed`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setPostData(data.data);
    } catch (error) { console.log(error); }
  };

  useEffect(() => {
    if (!Domain) return;
    getUserInfo();
    getNewsfeed();
  }, []);

  return (
    <div className="pb-20">
      <Header name="Database" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <FaDatabase className="text-cyan-400 text-xl" />
            <h1 className="text-2xl font-bold text-white">Raw Database View</h1>
          </div>
          <p className="text-white/50 text-sm">
            Inspect raw encrypted data exactly as stored in MongoDB. Fields shown are AES-256 ciphertext.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setUserSelected(true)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
              userSelected
                ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                : "bg-white/5 border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10"
            }`}
          >
            <FaUser className="text-xs" /> User Record
          </button>
          <button
            onClick={() => setUserSelected(false)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
              !userSelected
                ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                : "bg-white/5 border-white/10 text-white/50 hover:text-white/80 hover:bg-white/10"
            }`}
          >
            <FaNewspaper className="text-xs" /> Post Records
          </button>
        </div>

        {/* Loading */}
        {(!userData || !postData) && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-10 h-10 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-white/50">Fetching database records...</p>
          </div>
        )}

        {userData && postData && (
          <div>
            {userSelected ? <Databasetable user={userData} /> : <PostDatabase posts={postData} />}
          </div>
        )}
      </div>
    </div>
  );
}
