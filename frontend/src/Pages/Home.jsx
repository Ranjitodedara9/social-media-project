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
          <div className=" w-[300px] mt-5  border-solid border-2 border-sky-500 rounded-md">
            <div className="bg-lime-500 w-[100%] text-white p-3">
              {value.title}
            </div>
            <div className="p-3 h-[150px] flex justify-center items-center ">
              {value.description}
            </div>
            <div className="bg-lime-500 w-[100%] text-white p-3">
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
