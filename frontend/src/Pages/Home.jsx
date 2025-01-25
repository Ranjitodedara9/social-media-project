import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postAllGet, userLike } from "../Api/Api";

const Home = () => {
  const [postData, setPostData] = useState([]);
  const [error, setError] = useState(null); // Added error state

  const token = localStorage.getItem("token");
  const likeCount = 0;

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

  // Function to handle "Like" button
  const handleLike = async (postId) => {
    const response = await userLike(postId);
    const response2 = await postAllGet();

    setPostData(response2.allPost || []);
  };

  // Function to handle "Comment" button
  const handleComment = (postId) => {
    console.log("Comment button clicked for post:", postId);
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
                  {value.description.split(" ").slice(0, 30).join(" ")}
                  {value.description.split(" ").length > 30 && "..."}
                </div>
                <div className="bg-box2-color w-full text-white p-3">
                  Post By {value.username}
                </div>
              </Link>
              {/* Like and Comment buttons */}
              <div className="flex justify-between bg-box-color px-4 py-2 rounded-b-lg">
                <button
                  onClick={() => handleLike(value.id)}
                  className={`text-white font-medium px-4 py-2 rounded-lg transition duration-300 ${
                    value.liked
                      ? "bg-btn-color"
                      : "bg-btn-color hover:bg-btn-color"
                  }`}>
                  {value.liked ? "Liked " : "Like "}
                  {value.likes.length}
                </button>
                <button
                  onClick={() => handleComment(value.id)}
                  className="bg-green-500 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                  Comment {value.Comments.length}
                </button>
              </div>
            </div>
          ))
        ) : error ? (
          // Show error message if API fails
          <div className="flex w-full justify-center items-center h-[100vh]">
            <p className="text-red-500 font-semibold">{error}</p>
          </div>
        ) : (
          // Show no posts message
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
        )
      ) : (
        // If not logged in, show login prompt
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-white text-center text-lg font-semibold mb-4">
            You’re not logged in. Sign in to view the latest posts!
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
};

export default Home;
