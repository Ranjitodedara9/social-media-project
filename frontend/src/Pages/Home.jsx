import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/post");
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
      {postData.length > 0 ? (
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
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Home;
