import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import PostReg from "./Pages/postReg";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import Navbar from "./Pages/Navbar";

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
        </Routes>
      </div>
      <footer className="bg-blue-700 h-[60px] text-white flex justify-between items-center px-5 shadow-md mt-5">
        Social Media Web App
      </footer>
    </Router>
  );
};

export default App;

