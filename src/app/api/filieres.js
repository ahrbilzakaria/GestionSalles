import axiosGenInstance from "./services/axiosGenInstance";

export const getAllFiliers = async () => {
  try {
    const response = await axiosGenInstance.get("/filieres", {
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

export const getFilier = async (id) => {
  try {
    // Append the id to the URL dynamically
    const response = await axiosGenInstance.get(`/filieres/${id}`, {
      headers: {
        "Content-Type": "application/json", // Optional if already set globally
      },
    });

    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching filiere by ID:", error);
    throw error; // Re-throw for further handling
  }
};

export const addFiliere = async (payload) => {
  try {
    const response = await axiosGenInstance.post("/filieres", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the created filiere data
  } catch (error) {
    console.error("Error adding filiere:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const updateFiliere = async (id, payload) => {
  try {
    const response = await axiosGenInstance.put(`/filieres/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the updated filiere data
  } catch (error) {
    console.error("Error updating filiere:", error);
    throw error; // Re-throw the error for further handling
  }
};

export const deleteFiliere = async (id) => {
  try {
    const response = await axiosGenInstance.delete(`/filieres/${id}`);
    return response.status === 204; // Return true if deletion was successful (no content)
  } catch (error) {
    console.error("Error deleting filiere:", error);
    throw error; // Re-throw the error for further handling
  }
};
