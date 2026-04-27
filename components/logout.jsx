"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Domain } from "@/utils/constants";

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`${Domain}/api/logout`, { method: "GET" });
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <button
      className="btn-danger text-sm px-4 py-2"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
