import axios from "axios";

// Example: Get auth token and email (you might use cookies, localStorage, or context)
const getAuthToken = () =>
  JSON.parse(localStorage.getItem("userToken")).verificationToken;
const getUserEmail = () => JSON.parse(localStorage.getItem("userToken")).email;

const axiosGenInstance = axios.create({
  baseURL: "http://localhost:8080/School_1-1.0-SNAPSHOT/api",
});

axiosGenInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    const email = getUserEmail();

    console.log(token, "api");

    if (token) {
      config.headers["Authorization"] = token;
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

export default axiosGenInstance;
