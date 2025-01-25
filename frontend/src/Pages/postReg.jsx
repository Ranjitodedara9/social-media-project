import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postReg } from "../Api/Api";
import { toast } from "react-toastify";

function PostReg() {
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check for authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
      setFormData((prevData) => ({
        ...prevData,
        username,
      }));
      setIsAuthenticated(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!formData.title || !formData.description) {
      setError("All fields are required.");
      return;
    }

    try {
      await postReg(formData);

      setFormData((prevData) => ({
        ...prevData,
        title: "",
        description: "",
      }));
      toast.success("Post successfully created!");
      navigate("/");
    } catch (error) {
      setError("Error: Unable to create the post. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-bg-color p-4 sm:p-6">
      {isAuthenticated ? (
        <form
          onSubmit={handleSubmit}
          className="bg-form-color text-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
          {error && (
            <div className="text-red-600 text-center mb-4 font-medium">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="text-green-600 text-center mb-4 font-medium">
              {successMessage}
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
            Create a New Post
          </h2>

          <div className="mb-4">
            <label className="block text-white font-medium mb-2">
              Post Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-form-color text-white"
              placeholder="Enter the post title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white font-medium mb-2">
              Post Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-form-color text-white"
              placeholder="Write a detailed description"
              rows={5}></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-btn-color text-white font-medium py-2 px-4 rounded-lg hover:bg-red-500 hover:shadow-md transition duration-300">
            Submit Post
          </button>
        </form>
      ) : (
        <div className="bg-box-color shadow-lg rounded-lg p-6 sm:p-8 max-w-md text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            Please Log In
          </h2>
          <p className="text-white mb-6">
            You must be logged in to create a post. Please log in to your
            account to continue.
          </p>
          <a
            href="/login"
            className="bg-btn-color text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300">
            Go to Login
          </a>
        </div>
      )}
    </div>
  );
}

export default PostReg;
