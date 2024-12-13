import { toast } from "@/hooks/use-toast";
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

export const getAllProfesseurs = async () => {
  try {
    const response = await axiosUsersInstance.get("/professeurs", {
      headers: {
        "Content-Type": "application/json", // This might not be necessary as it’s already set globally
      },
    });
    return response.data; // Return the actual data received from the server
  } catch (error) {
    console.error("Error sending data:", error);
    throw error; // Re-throw the error if needed for further handling elsewhere
  }
};

export const login = async (payload) => {
  try {
    const response = await axiosUsersInstance.post("/login", payload, {
      headers: {
        "Content-Type": "application/json", // Ensure content type is set to JSON
      },
    });
    return response.data;
  } catch (error) {
    //console.error("Error sending data:", error);
    throw error;
  }
};
