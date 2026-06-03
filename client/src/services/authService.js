import API from "./api";

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);

  localStorage.setItem(
    "userInfo",
    JSON.stringify(response.data)
  );

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);

  localStorage.setItem(
    "userInfo",
    JSON.stringify(response.data)
  );

  return response.data;
};

export const googleLogin = async (credential) => {
  const response = await API.post("/auth/google", {
    credential,
  });

  localStorage.setItem(
    "userInfo",
    JSON.stringify(response.data)
  );

  return response.data;
};

export const getProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await API.put(
    "/auth/profile",
    userData
  );

  localStorage.setItem(
    "userInfo",
    JSON.stringify(response.data)
  );

  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("userInfo");
};

export const getCurrentUser = () => {
  const userInfo = localStorage.getItem("userInfo");

  return userInfo ? JSON.parse(userInfo) : null;
};