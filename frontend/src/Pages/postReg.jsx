import React, { useState, useEffect } from "react";
import axios from "axios";

function PostReg() {
  const [formData, setFormData] = useState({
    username: "",
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
      setFormData((prevData) => ({
        ...prevData,
        username, // Populate username automatically
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

    // Validate form inputs
    if (!formData.title || !formData.description) {
      setError("All fields are required.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/post",
        {
          title: formData.title,
          description: formData.description,
          username: formData.username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);

      // Reset form fields
      setFormData((prevData) => ({
        ...prevData,
        title: "",
        description: "",
      }));
      setSuccessMessage("Post successfully created!");
    } catch (error) {
      console.error("Error in posting data:", error);
      setError("Error: Unable to create the post. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {isAuthenticated ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-center mb-4 font-medium">
              {error}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="text-green-600 text-center mb-4 font-medium">
              {successMessage}
            </div>
          )}

          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Create a New Post
          </h2>

          {/* Title Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Post Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the post title"
            />
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Post Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a detailed description"
              rows={5}></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 hover:shadow-md transition duration-300">
            Submit Post
          </button>
        </form>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Please Log In
          </h2>
          <p className="text-gray-600">
            You must be logged in to create a post. Please log in to your
            account to continue.
          </p>
          <a
            href="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 mt-5 inline-block">
            Go to Login
          </a>
        </div>
      )}
    </div>
  );
}

export default PostReg;
