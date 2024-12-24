"use client";
import React from "react";
import { useState, useEffect } from "react";
import NewPostModal from "@/components/newPostModal";
import Header from "@/components/header";
import { decrypt } from "@/utils/crypto";
import { Domain } from "@/utils/constants";
import ConfirmDelete from "@/components/newsfeed/confirmDelete";

export default function Page() {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [feedData, setFeedData] = useState(null);

  //for delete post
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  const openDeleteModal = (postId) => {
    setCurrentPostId(postId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurrentPostId(null);
  };

  const handleConfirm = (postId) => {
    deleteANewsfeed(postId); // Pass postId to your function
  };

  //for post
  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
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
      setFeedData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteANewsfeed = async (post_id) => {
    const data = {
      postID: post_id,
    };
    try {
      const response = await fetch(`${Domain}/api/newsfeed`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleSubmit = async (postData) => {
    const data = {
      author: userData.name,
      author_id: userData._id,
      ...postData,
    };

    try {
      const response = await fetch(`${Domain}/api/newsfeed`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      const rdata = await response.json();

      if (!response.ok) {
        console.error("New post addition error:", rdata.message);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("New post addition error:", error);
    }
  };

  const getDate = (data) => {
    const date = new Date(data);

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = date.toLocaleString("en-GB", options);

    return formattedDate;
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
    <div className="pb-20">
      <Header name="Newsfeed" />
      <div className="px-12">
        <div className="py-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-500 duration-300"
          >
            Add New Post
          </button>
          {isModalOpen && (
            <NewPostModal
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleSubmit}
            />
          )}
        </div>
        <div className="">
          {feedData &&
            (feedData && feedData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {feedData.map((post, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-4 w-full pb-2 hover:shadow-lg transition-shadow duration-300"
                  >
                    <section className="flex justify-between items-center pb-3">
                      <p className="text-xs text-gray-400 w-2/5">
                        {getDate(post.createdAt)}
                      </p>
                      <p className="text-sm font-semibold text-gray-700 bg-green-100 border border-green-200 rounded-lg px-3 py-1">
                        {decrypt(post.author)}
                      </p>
                    </section>

                    <div className="flex flex-col justify-between h-40">
                      <section className="px-2">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                          {decrypt(post.title)}
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {decrypt(post.content).slice(0, 100) +
                            (decrypt(post.content).length > 100 ? "..." : "")}
                        </p>
                      </section>

                      <section className="flex items-center justify-between mt-3">
                        {post.author_id === userData?._id && (
                          <div>
                            <p
                              className="text-red-500 text-sm font-medium cursor-pointer hover:underline"
                              onClick={() => openDeleteModal(post._id)}
                            >
                              Delete
                            </p>
                            <ConfirmDelete
                              isOpen={isDeleteModalOpen}
                              onClose={closeDeleteModal}
                              onConfirm={handleConfirm}
                              postId={currentPostId}
                            />
                          </div>
                        )}
                        <p
                          className="text-blue-500 text-sm font-medium cursor-pointer hover:underline"
                          onClick={() => openModal(post)}
                        >
                          View Post
                        </p>
                      </section>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-2xl text-[#f2jk87]">
                Currently, The newsfeed is empty. Please click the {"'"}Add New
                Post{"'"} button to create a new post.
              </div>
            ))}

          {/* Modal */}
          {selectedPost && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 px-4 sm:px-6">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md h-96 flex flex-col overflow-hidden">
                <div className="p-6 border-b">
                  <h2 className="text-center text-2xl font-semibold text-gray-800">
                    {decrypt(selectedPost.title)}
                  </h2>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {decrypt(selectedPost.content)}
                  </p>
                </div>
                <div className="p-4 border-t text-center">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
