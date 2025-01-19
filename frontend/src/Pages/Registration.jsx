import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { userReg } from "../Api/Api";

function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

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
    if (!formData.username || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await userReg(formData);

      // Reset form and show success message
      setFormData({
        username: "",
        password: "",
      });
      setSuccessMessage("Registration successfully!");
      navigate("/");
    } catch (error) {
      console.error("username Already Exit:", error);
      setError("Error: Username Already Exit");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-bg-color">
      <form
        onSubmit={handleSubmit}
        className="bg-form-color shadow-3xl rounded-lg p-8 w-full max-w-md">
        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mb-4 font-medium">
            {error}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="text-green-500 text-center mb-4 font-medium">
            {successMessage}
          </div>
        )}

        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Registration
        </h2>

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">
            Enter a Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6780AB] bg-form-color text-white"
            placeholder="Enter your username"
          />
        </div>

        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">
            Enter a password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6780AB] bg-form-color text-white"
            placeholder="Enter a Password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-btn-color text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
          Submit
        </button>
        {/* Login Link */}
        <p className="text-white text-center mt-4">
          Do You have an account?{" "}
          <Link
            to="/login"
            className="text-btn-color hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Registration;
