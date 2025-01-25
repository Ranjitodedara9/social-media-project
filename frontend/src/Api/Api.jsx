import axios from "axios";

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: "https://social-media-project-0m4g.onrender.com/", // Replace with your backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const userLogin = async (formData) => {
  try {
    const response = await api.post("/login", formData);

    localStorage.setItem("token", response.data.user.token);
    localStorage.setItem("username", response.data.user.username);
    localStorage.setItem("UserId", response.data.user.id);
    return response.data.user;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      throw new Error("No response from the server. Please try again.");
    } else {
      throw new Error("Unexpected error occurred. Please try again.");
    }
  }
};

export const userReg = async (formData) => {
  try {
    const response = await api.post("/register", formData);

    localStorage.setItem("token", response.data.user.token);
    localStorage.setItem("username", response.data.user.username);
    localStorage.setItem("UserId", response.data.user.id);

    return response.data.user;
  } catch (error) {
    if (error.response) {
      throw error.response;
    } else if (error.request) {
      throw new Error("No response from the server. Please try again.");
    } else {
      throw new Error("Unexpected error occurred. Please try again.");
    }
  }
};

export const postReg = async (postData) => {
  const userToken = localStorage.getItem("token");
  const user_id = localStorage.getItem("UserId");

  const headers = {
    Authorization: `Bearer ${userToken}`,
  };

  const payload = { ...postData, user_id }; // Flatten the payload if required.
  console.log(payload);
  try {
    const response = await api.post("/post", payload, { headers });
    console.log(response);
    return response.data; // Return the data on success.
  } catch (error) {
    console.error(
      "Error in Post Register API:",
      error.response?.data || error.message
    );
    throw error.response?.data || error; // Re-throw the error for further handling.
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

export const userPost = async () => {
  const user_id = localStorage.getItem("UserId");

  try {
    const response = await api.get(`/postuserauth/${user_id}`);

    return response.data[0];
  } catch (error) {
    console.log("Error Durring User Post Get...");
  }
};

export const userLike = async (post_id) => {
  const userToken = localStorage.getItem("token");

  if (!userToken) {
    console.error("Token is missing. Please check localStorage.");
    return null;
  }

  console.log(userToken);

  const header = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    const response = await api.post(`/post/likes/${post_id}`, {}, header);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error Durring User Like Post...");
  }
};

export const postDelete = async (post_id) => {
  const userToken = localStorage.getItem("token");

  if (!userToken) {
    console.error("Token is missing. Please check localStorage.");
    return null;
  }

  const header = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    const response = await api.delete(`/post/delete/${post_id}`, header);

    return response.data;
  } catch (error) {
    console.log("Error Durring User Like Post...");
  }
};

export const postUpdate = async (post_id, postData) => {
  const userToken = localStorage.getItem("token");

  if (!userToken) {
    console.error("Token is missing. Please check localStorage.");
    return null;
  }

  const header = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  try {
    const response = await api.put(
      `/post/update/${post_id}`,
      { title: postData.title, description: postData.description },
      header
    );

    return response.data;
  } catch (error) {
    console.log("Error Durring User Like Post...");
  }
};

export default api;
