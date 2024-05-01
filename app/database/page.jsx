"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Domain } from "@/utils/constants";
import Databasetable from "@/components/databasetable";
import Header from "@/components/header";

export default function Database() {
  const [userData, setUserData] = useState(null);

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

  useEffect(() => {
    if (!Domain) {
      return null;
    } else {
      getUserInfo();
    }
  }, []);
  return (
    <div>
      <Header name="Database" />
      {userData && (
        <div className="">
          <Databasetable user={userData} />
        </div>
      )}
    </div>
  );
}
