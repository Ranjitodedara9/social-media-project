import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postDelete, userPost, postUpdate } from "../Api/Api"; // Assuming delete and update APIs are available
import { toast } from "react-toastify";

const YourPost = () => {
  const [postData, setPostData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null); // State to hold the post being edited
  const [editForm, setEditForm] = useState({ title: "", description: "" }); // Form data for editing
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userPost();
        setPostData(response.Posts || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (post) => {
    setEditingPost(post.id);
    setEditForm({ title: post.title, description: post.description });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have an API function to update a post
      await postUpdate(editingPost, editForm);
      setPostData((prev) =>
        prev.map((post) =>
          post.id === editingPost ? { ...post, ...editForm } : post
        )
      );
      setEditingPost(null); // Exit editing mode
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        await postDelete(id); // Assuming you have an API function to delete a post
        setPostData((prev) => prev.filter((post) => post.id !== id));
        toast.success("Post Deleted..");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post. Please try again.");
      }
    }
  };

  const renderContent = () => {
    if (!token) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-gray-700 text-lg font-semibold mb-4">
            You’re not logged in. Sign in to view the latest posts!
          </p>
          <Link
            to="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Go to Login
          </Link>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-[100vh]">
          <div className="loader"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-[100vh]">
          <p className="text-red-500 font-semibold mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300">
            Retry
          </button>
        </div>
      );
    }

    if (postData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-screen gap-1">
          <p className="text-white text-center text-lg font-semibold mb-4">
            No posts available.
          </p>
          <a
            href="/createpost"
            className="bg-btn-color text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300">
            Create New Post
          </a>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-4 justify-center items-center bg-bg-color pb-5">
        {postData.map((value) => (
          <div
            key={value.id}
            className="w-[90%] md:w-[50%] lg:w-[35%] mt-5 shadow-3xl hover:shadow-4xl rounded-[10px] cursor-pointer transition duration-300">
            {editingPost === value.id ? (
              <form
                onSubmit={handleEditSubmit}
                className="p-5 bg-box-color rounded-lg">
                <div className="mb-3 ">
                  <label className="block text-white font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    className="w-full border bg-box-color rounded-lg px-4 py-2"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-white font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="w-full border bg-box-color rounded-lg px-4 h-[120px]"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingPost(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="bg-box2-color w-full text-white p-3 text-center font-semibold">
                  {value.title}
                </div>
                <div className="p-3 h-[200px] flex justify-center items-center text-white bg-box-color">
                  {value.description.split(" ").slice(0, 30).join(" ")}
                  {value.description.split(" ").length > 30 && "..."}
                </div>
                <div className="bg-box2-color w-full text-white p-3">
                  Post By {value.username}
                </div>
                <div className="flex justify-between p-3 bg-box-color">
                  <button
                    onClick={() => handleEdit(value)}
                    className="bg-btn-color text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(value.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-bg-color text-white">
      <h1 className="text-center text-2xl font-bold text-white py-6">
        {username}, This is Your Post
      </h1>
      {renderContent()}
    </div>
  );
};

export default YourPost;
