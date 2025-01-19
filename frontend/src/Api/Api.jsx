import axios from "axios";

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:3000", // Replace with your backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const userLogin = async (formData) => {
  try {
    const response = await api.post("/login", formData);

    localStorage.setItem("token", response.data.user.token);
    localStorage.setItem("username", response.data.user.username);
    return response.data.user;
  } catch (error) {
    console.log({ error: "Error in Login Api" });
  }
};

export const userReg = async (formData) => {
  try {
    const response = await api.post("/register", formData);

    localStorage.setItem("token", response.data.user.token);
    localStorage.setItem("username", response.data.user.username);
    return response.data.user;
  } catch (error) {
    console.log({ error: "Error in Register Api" });
  }
};

export const postReg = async (postData) => {
  const userToken = localStorage.getItem("token");

  const header = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  try {
    const response = await api.post("/post", postData, header);

    return response.data;
  } catch (error) {
    console.log({ error: "Error in Post Register Api" });
  }
};

export const postAllGet = async (postData) => {
  const userToken = localStorage.getItem("token");

  const header = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };
  try {
    const response = await api.get("/post", header);

    return response.data;
  } catch (error) {
    console.log({ error: "Error in Get post Api" });
  }
};

export default api;
