import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { userLogin } from "../Api/Api";
import { toast } from "react-toastify";

function Login() {
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

    if (!formData.username || !formData.password) {
      setError("All fields are required.");
      return;
    }

    try {
      await userLogin(formData);

      setFormData({
        username: "",
        password: "",
      });

      toast.success("Login successfully!");
      navigate("/");
    } catch (error) {
      if (error) {
        if (error.status == 400) {
          setError("User Not exists.");
        } else if (error.status == 409) {
          setError("Incorrect username or password.");
        } else {
          setError("Error: Something went wrong. Please try again later.");
        }
      } else {
        setError(
          "Error: Unable to connect to the server. Please check your internet connection."
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-bg-color p-4 sm:p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-form-color shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
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

        <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-6">
          Login
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-form-color text-white"
            placeholder="Enter your username"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-white font-medium mb-2">
            Enter a Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-form-color text-white"
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-btn-color text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
          Submit
        </button>

        {/* Registration Link */}
        <p className="text-white text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-btn-color hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
