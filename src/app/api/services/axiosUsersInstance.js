import axios from "axios";

// Helper function to get a cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop().split(";").shift();
    try {
      return JSON.parse(cookieValue); // Parse the cookie value as JSON
    } catch (e) {
      return null; // In case the cookie is not a valid JSON
    }
  }
  return null;
};

// Updated functions to get auth token and email from cookies
const getAuthToken = () => getCookie("authToken");
const getUserEmail = () => getCookie("userEmail");

// Axios instance for user-specific requests
const axiosUsersInstance = axios.create({
  baseURL: "http://localhost:8080/School_1-1.0-SNAPSHOT/api/users",
});

// Interceptor for user-specific requests
axiosUsersInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    const email = getUserEmail();

    if (token) {
      config.headers["Authorization"] = `${token}`;
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
