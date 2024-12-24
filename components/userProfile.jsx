import React from "react";
import { decrypt } from "@/utils/crypto";

export default function UserProfile({
  userData,
  showEncrypted,
  setShowEncrypted,
  setIsModalOpen,
}) {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center px-4 sm:px-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h2>

        {/* Button Group */}
        <div className="flex gap-4 sm:gap-8 items-center mb-6 text-sm">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 sm:px-6 rounded-lg shadow-md focus:outline-none transition"
          >
            Update Info
          </button>
          <button
            onClick={() => setShowEncrypted(!showEncrypted)}
            className={`py-2 px-4 sm:px-6 rounded-lg transition ${
              showEncrypted
                ? "bg-green-500 hover:bg-green-600"
                : "bg-purple-500 hover:bg-purple-600"
            } text-white`}
          >
            {showEncrypted ? "Actual Data" : "Encrypted Data"}
          </button>
        </div>

        {userData ? (
          <div className="space-y-6">
            {/* Name */}
            <div className="">
              <h3 className="text-lg font-medium text-gray-800 break-words">
                <span className="font-semibold">Name: </span>{" "}
                {showEncrypted ? (
                  <span>{userData.name}</span>
                ) : (
                  <span className="text-gray-600">
                    {decrypt(userData.name)}
                  </span>
                )}
              </h3>
            </div>

            {/* Student ID */}
            <div className="">
              <h3 className="text-lg font-medium text-gray-800 break-words">
                <span className="font-semibold">Student ID: </span>{" "}
                <span className="text-gray-600">{userData.studentID}</span>
              </h3>
            </div>

            {/* Email */}
            <div className="">
              <h3 className="text-lg font-medium text-gray-800 break-words">
                <span className="font-semibold">Email: </span>{" "}
                {showEncrypted ? (
                  <span>{userData.email}</span>
                ) : (
                  <span className="text-gray-600">
                    {decrypt(userData.email)}
                  </span>
                )}
              </h3>
            </div>

            {/* Gender */}
            <div className="">
              <h3 className="text-lg font-medium text-gray-800 break-words">
                <span className="font-semibold">Gender: </span>{" "}
                {showEncrypted ? (
                  <span>{userData.gender}</span>
                ) : (
                  <span className="text-gray-600">
                    {decrypt(userData.gender)}
                  </span>
                )}
              </h3>
            </div>

            {/* University */}
            <div className="">
              <h3 className="text-lg font-medium text-gray-800 break-words">
                <span className="font-semibold">University: </span>{" "}
                {showEncrypted ? (
                  <span>{userData.university}</span>
                ) : (
                  <span className="text-gray-600">
                    {decrypt(userData.university)}
                  </span>
                )}
              </h3>
            </div>

            {/* Department */}
            <div className="">
              <h3 className="text-lg font-medium text-gray-800 break-words">
                <span className="font-semibold">Department: </span>{" "}
                {showEncrypted ? (
                  <span>{userData.department}</span>
                ) : (
                  <span className="text-gray-600">
                    {decrypt(userData.department)}
                  </span>
                )}
              </h3>
            </div>

            {/* Bio */}
            <div className="">
              <h3 className="text-lg font-medium text-gray-800">
                <span className="font-semibold">Bio: </span>{" "}
                {showEncrypted ? (
                  <span className="break-words">{userData.bio}</span>
                ) : (
                  <span className="text-gray-600">{decrypt(userData.bio)}</span>
                )}
              </h3>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading user data...</p>
        )}
      </div>
    </div>
  );
}
