import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postAllGet } from "../Api/Api";

const Home = () => {
  const [postData, setPostData] = useState([]);
  const [error, setError] = useState(null); // Added error state
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postAllGet();
        setPostData(response.allPost || []); // Ensure `response.allPost` exists
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load posts. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const addPost = (id) => {
    localStorage.setItem("postId", id);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-bg-color pb-5">
      {/* Check if user is logged in */}
      {token ? (
        // Show posts if available
        postData.length > 0 ? (
          postData.map((value) => (
            <div
              key={value.id} // Add unique key for each post
              className="w-[90%] md:w-[50%] lg:w-[35%] mt-5 shadow-3xl hover:shadow-4xl rounded-[10px] cursor-pointer">
              <Link
                to="/fullpost"
                onClick={() => addPost(value.id)} // Fix: Use arrow function
              >
                <div className="bg-box2-color w-full text-white p-3 text-center">
                  {value.title}
                </div>
                <div className="p-3 h-[200px] flex justify-center items-center text-white bg-box-color">
                  {value.description}
                </div>
                <div className="bg-box2-color w-full text-white p-3">
                  Post By {value.username}
                </div>
              </Link>
            </div>
          ))
        ) : error ? (
          // Show error message if API fails
          <div className="flex w-full justify-center items-center h-[100vh]">
            <p className="text-red-500 font-semibold">{error}</p>
          </div>
        ) : (
          // Show no posts message
          <div className="flex w-full justify-center items-center h-[100vh]">
            <p className="text-gray-700 font-semibold">No posts available.</p>
          </div>
        )
      ) : (
        // If not logged in, show login prompt
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-gray-700 text-lg font-semibold mb-4">
            You’re not logged in. Sign in to view the latest posts!
          </p>
          <a
            href="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Go to Login
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
