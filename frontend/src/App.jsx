import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import PostReg from "./Pages/PostReg";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Navbar from "./Screens/Navbar";
import PostDetails from "./Pages/postDetails";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <Router>
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
          {!token ? (
            <Route
              path="/login"
              element={<Login />}
            />
          ) : (
            <Route
              path="/"
              element={<Home />}
            />
          )}

          <Route
            path="/register"
            element={<Registration />}
          />
          <Route
            path="/fullpost"
            element={<PostDetails />}
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

