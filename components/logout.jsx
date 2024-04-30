"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Domain } from "@/utils/constants";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`${Domain}/api/logout`, {
        method: "GET",
      });
      router.push("/login");
      console.log("Logout successful");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <button
        className="bg-red-300 p-2 hover:bg-red-600 hover:text-white duration-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
