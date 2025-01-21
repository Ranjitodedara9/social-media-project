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
export const postById = async () => {
  const userToken = localStorage.getItem("token");
  const id = localStorage.getItem("postId");

  if (!userToken || !id) {
    console.error("Token or Post ID is missing. Please check localStorage.");
    return null;
  }

  const header = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    const response = await api.get(`/postbyid/${id}`, header);
    console.log("Post fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching the post by ID:",
      error?.response?.data || error.message
    );
    return null;
  }
};

export const commentPost = async (id, comment) => {
  const userToken = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (!userToken || !id || !username) {
    console.error("Token or Post ID is missing. Please check localStorage.");
    return null;
  }

  const header = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    const response = await api.post(`/post/comments`, {
      username: username,
      commentBody: comment,
      post_Id: id,
    });
    console.log("Comment Post successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error Post the Comment by ID:",
      error?.response?.data || error.message
    );
    return null;
  }
};

export const commentGet = async () => {
  try {
    const id = localStorage.getItem("postId");
    const response = await api.get(`/post/comments/${id}`);
    console.log(response.data[0]);
    return response.data[0];
  } catch (error) {
    console.log("Error Durring Get comments...");
  }
};

export default api;
