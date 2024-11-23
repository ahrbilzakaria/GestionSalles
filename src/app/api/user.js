import axiosUsersInstance from "./services/axiosUsersInstance";

export const signUp = async (payload) => {
  try {
    console.log("api", payload);
    const response = await axiosUsersInstance.post("/signup", payload, {
      headers: {
        "Content-Type": "application/json", // Ensure content type is set to JSON
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};

export const login = async (payload) => {
  try {
    console.log("api", payload);
    const response = await axiosUsersInstance.post("/login", payload, {
      headers: {
        "Content-Type": "application/json", // Ensure content type is set to JSON
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending data:", error);
    throw error;
  }
};
