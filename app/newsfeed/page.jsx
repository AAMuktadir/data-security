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
            className="bg-blue-500 text-white px-6 py-2 rounded-md pb-4 hover:bg-blue-600"
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
                    className="bg-white rounded-lg shadow-lg p-2 w-full  pb-1"
                  >
                    <section className="flex justify-between items-start pb-2">
                      <p className="pb-1 text-xs text-gray-500 w-2/5">
                        {getDate(post.createdAt)}
                      </p>
                      <p className="text-sm font-light text-black text-right border rounded-lg p-1 bg-green-200">
                        {decrypt(post.author)}
                      </p>
                    </section>

                    <div className="flex flex-col justify-between h-40">
                      <section className="px-4">
                        <h2 className="text-lg font-medium pb-2">
                          {decrypt(post.title)}
                        </h2>

                        <p className="text-gray-600 text-sm">
                          {decrypt(post.content).slice(0, 100) +
                            (post.content.length > 100 ? "..." : "")}
                        </p>
                      </section>

                      <section className="flex items-center justify-between">
                        <p className="">
                          {post.author_id == userData?._id && (
                            <div className="">
                              <p
                                className="text-red-500 rounded-xl cursor-pointer"
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
                        </p>

                        <p
                          className="text-black cursor-pointer"
                          onClick={() => openModal(post)}
                        >
                          View post
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
            <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 px-40">
              <div className="bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-center text-3xl font-bold mb-4">
                  {decrypt(selectedPost.title)}
                </h2>
                <p className="text-gray-700">{decrypt(selectedPost.content)}</p>
                <button
                  className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
