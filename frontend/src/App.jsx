import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import PostReg from "./Pages/postReg";

const App = () => {
  return (
    <Router>
      <div>
        <nav className="text-center bg-blue-700 h-[50px] text-white flex justify-center items-center gap-3">
          <Link to="/">Home </Link> |
          <Link to="/createpost">Create New Post</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/createpost"
            element={<PostReg />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

