import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import PostReg from "./Pages/PostReg";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Navbar from "./Screens/Navbar";
import PostDetails from "./Pages/postDetails";
import YourPost from "./Pages/YourPost";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        hideProgressBar={false}
      />
      <Navbar />
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/createpost"
            element={<PostReg />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/register"
            element={<Registration />}
          />
          <Route
            path="/fullpost"
            element={<PostDetails />}
          />
          <Route
            path="/yourpost"
            element={<YourPost />}
          />
        </Routes>
      </div>
      <footer className="bg-bg-color h-[60px] text-white flex justify-between items-center px-5 shadow-md">
        Social Media Web App By Dharmik Odedara
      </footer>
    </Router>
  );
};

export default App;

