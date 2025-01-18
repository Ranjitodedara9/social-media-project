import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [postData, setPostData] = useState([]);

  const token = localStorage.getItem("token");

  console.log(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/post", {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token in headers
          },
        });
        setPostData(response.data); // Update state with fetched data
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {token ? (
        postData.length > 0 ? (
          postData.map((value, key) => (
            <div className=" w-[400px] mt-5 shadow-3xl hover:shadow-4xl rounded-[10px] cursor-pointer">
              <div className="bg-blue-600 w-[100%] text-white p-3 text-center">
                {value.title}
              </div>
              <div className="p-3 h-[150px] flex justify-center items-center ">
                {value.description}
              </div>
              <div className="bg-blue-600 w-[100%] text-white p-3">
                {value.username}
              </div>
            </div>
          ))
        ) : (
          <div className="flex w-100 justify-center items-center h-[100vh]">
            <p>No posts available</p>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-gray-700 text-lg font-semibold mb-4">
            You’re not logged in. Sign in to view the latest posts!
          </p>
          <a
            href="/login"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Go to Login
          </a>
        </div>
      )}
    </div>
  );
};

export default Home;
