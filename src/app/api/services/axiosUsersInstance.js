import axios from "axios";

// Example: Get auth token and email (you might use cookies, localStorage, or context)
const getAuthToken = () => localStorage.getItem("authToken");
const getUserEmail = () => localStorage.getItem("userEmail");

const axiosUsersInstance = axios.create({
  baseURL: "http://localhost:8080/School_1-1.0-SNAPSHOT/api/users",
});

axiosUsersInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    const email = getUserEmail();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (email) {
      config.headers["email"] = email;
    }

    return config;
  },
  (error) => {
    // Handle errors before they reach the API
    return Promise.reject(error);
  }
);

export default axiosUsersInstance;
