"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Domain } from "@/utils/constants";
import Databasetable from "@/components/databasetable";
import Header from "@/components/header";
import PostDatabase from "@/components/postDatabase";

export default function Database() {
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [userSelected, setUserSelected] = useState(true);

  const getUserInfo = async () => {
    try {
      const response = await fetch(`${Domain}/api/extractdata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getNewsfeed = async () => {
    try {
      const response = await fetch(`${Domain}/api/newsfeed`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPostData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!Domain) {
      return null;
    } else {
      getUserInfo();
      getNewsfeed();
    }
  }, []);
  return (
    <div>
      <Header name="Database" />

      <div className="px-4 sm:px-12 py-8 flex gap-6 font-medium">
        <button
          onClick={() => setUserSelected(true)}
          className={`py-2 px-4 rounded-lg shadow-md transition duration-300 ${
            userSelected
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-blue-100"
          }`}
        >
          See your database
        </button>

        <button
          onClick={() => setUserSelected(false)}
          className={`py-2 px-4 rounded-lg shadow-md transition duration-300 ${
            !userSelected
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-blue-100"
          }`}
        >
          See post database
        </button>
      </div>

      {userData && postData && (
        <div className="">
          {userSelected ? (
            <div className="">
              {" "}
              <Databasetable user={userData} />
            </div>
          ) : (
            <div className="">
              <PostDatabase posts={postData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
