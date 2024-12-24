import React from "react";

export default function Databasetable({ user }) {
  return (
    <div className="bg-gray-100 p-4 md:p-8 rounded-lg shadow-md text-wrap">
      <p className="text-lg font-bold mb-2">User Details:</p>
      <div className="space-y-4">
        <p className="break-words">
          <span className="font-semibold">_id:</span> {user._id}
        </p>
        <p className="break-words">
          <span className="font-semibold">name: </span> {user.name}
        </p>

        <p className="break-words">
          <span className="font-semibold">email:</span> {user.email}
        </p>

        <p className="break-words">
          <span className="font-semibold">university:</span> {user.university}
        </p>
        <p className="break-words">
          <span className="font-semibold">department:</span> {user.department}
        </p>

        <p className="break-words">
          <span className="font-semibold">studentID:</span> {user.studentID}
        </p>

        <p className="break-words">
          <span className="font-semibold">bio:</span> {user.bio}
        </p>

        <p className="break-words">
          <span className="font-semibold">gender:</span> {user.gender}
        </p>

        <p className="break-words">
          <span className="font-semibold">createdAt:</span> {user.createdAt}
        </p>
        <p className="break-words">
          <span className="font-semibold">updatedAt:</span> {user.updatedAt}
        </p>
        <p className="break-words">
          <span className="font-semibold">__v:</span> {user.__v}
        </p>
      </div>
    </div>
  );
}
