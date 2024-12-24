"use client";
import { useState, useEffect } from "react";
import { decrypt } from "@/utils/crypto";
import Header from "@/components/header";
import { Domain } from "@/utils/constants";
import UserProfile from "@/components/userProfile";
import UpdateUserInfoModal from "@/components/updateUserModal";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEncrypted, setShowEncrypted] = useState(false);

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

  const handleUpdate = async (data) => {
    console.log("Updated user data:", data);
    try {
      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const rdata = await response.json();
      window.location.reload();

      if (!response.ok) {
        console.error("Update error:", rdata.message);
      }
    } catch (error) {
      console.error("Update error:", error);
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
    <main className="">
      <Header
        name={(userData && "Hey " + decrypt(userData.name)) || "Hey there"}
      />
      <UserProfile
        userData={userData}
        showEncrypted={showEncrypted}
        setShowEncrypted={setShowEncrypted}
        setIsModalOpen={setIsModalOpen}
      />

      {isModalOpen && (
        <UpdateUserInfoModal
          userData={userData}
          onClose={() => setIsModalOpen(false)} // Close modal
          onUpdate={handleUpdate} // Handle update
        />
      )}
    </main>
  );
}
