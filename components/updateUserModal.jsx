import { useState } from "react";
import { decrypt } from "@/utils/crypto";

export default function UpdateUserInfoModal({ userData, onClose, onUpdate }) {
  const [userId, setUserId] = useState(userData._id);
  const [name, setName] = useState(decrypt(userData.name));
  const [email, setEmail] = useState(decrypt(userData.email));
  const [gender, setGender] = useState(decrypt(userData.gender));
  const [university, setUniversity] = useState(decrypt(userData.university));
  const [department, setDepartment] = useState(decrypt(userData.department));
  const [bio, setBio] = useState(decrypt(userData.bio));

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ userId, name, email, gender, university, department, bio });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-0">
      <div className="bg-white p-4 sm:p-8 rounded-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <span className="text-lg font-semibold">X</span>
        </button>
        <h2 className="text-3xl font-bold mb-8 text-center">
          Update User Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 py-1 px-1 bg-gray-200"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 py-1 px-1 bg-gray-200"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-lg font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-1 bg-gray-200"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="university"
              className="block text-lg font-medium text-gray-700"
            >
              University
            </label>
            <input
              type="text"
              id="university"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 py-1 px-1 bg-gray-200"
            />
          </div>

          <div>
            <label
              htmlFor="department"
              className="block text-lg font-medium text-gray-700"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 py-1 px-1 bg-gray-200"
            />
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block text-lg font-medium text-gray-700"
            >
              Bio
            </label>
            <input
              type="text"
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 py-1 px-1 bg-gray-200"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white text-lg px-4 py-1 rounded-md hover:bg-blue-700 duration-300"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
