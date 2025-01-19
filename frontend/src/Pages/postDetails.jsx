import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { postAllGet } from "../Api/Api";

const PostDetails = () => {
  const [postData, setPostData] = useState([]);
  const [comments, setComments] = useState([]); // State for comments
  const [newComment, setNewComment] = useState(""); // State for new comment
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postAllGet();
        setPostData(response.allPost || []);
        // Assuming `response.allPost[0].comments` contains the comments array
        setComments(response.allPost[0]?.comments || []);
      } catch (err) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    // Add the new comment to the comments state (optimistic UI update)
    setComments((prevComments) => [
      ...prevComments,
      { username: "CurrentUser", text: newComment },
    ]);
    setNewComment("");

    // Optionally, send the new comment to the backend (not implemented here)
    // Example: await apiCallToAddComment(newComment);
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-700 text-lg font-semibold mb-4">
          You’re not logged in. Sign in to view the latest posts!
        </p>
        <Link
          to="/login"
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Go to Login
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-700 text-lg">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (postData.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-700 text-lg">
          No posts available. Please check back later!
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full min-h-screen bg-bg-color pb-5 gap-5">
      {/* Post Container */}
      <div className="w-[40%] mt-5 flex flex-col shadow-3xl hover:shadow-4xl rounded-[10px]">
        <div className="bg-box2-color w-full text-white p-3 text-center">
          {postData[0]?.title}
        </div>
        <div className="p-3 h-[300px] flex justify-center items-center text-white bg-box-color">
          {postData[0]?.description}
        </div>
        <div className="bg-box2-color w-full text-white p-3 text-right">
          By {postData[0]?.username}
        </div>
      </div>

      {/* Comments Section */}
      <div className="flex flex-col w-[40%]  mt-5 bg-form-color p-5 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-3 text-white">Comments</h3>
        {comments.length > 0 ? (
          <div className="flex flex-col gap-4 ">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="p-3 border rounded-lg bg-white shadow-sm flex flex-col">
                <span className="text-gray-800 font-semibold">
                  {comment.username}
                </span>
                <span className="text-white">{comment.text}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">
            No comments yet. Be the first to comment!
          </p>
        )}

        {/* Add Comment Section */}
        <div className="flex flex-col mt-4">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded-lg mb-2 text-white"
          />
          <button
            onClick={handleAddComment}
            className="bg-btn-color text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 self-end">
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
