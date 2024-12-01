import axiosGenInstance from "./services/axiosGenInstance";

// Fetch all matieres
export const getAllMatieres = async () => {
  try {
    const response = await axiosGenInstance.get("/matieres", {
      headers: {
        "Content-Type": "application/json", // This might not be necessary as it’s already set globally
      },
    });
    return response.data; // Return the actual data received from the server
  } catch (error) {
    console.error("Error fetching all matieres:", error);
    throw error; // Re-throw the error for further handling
  }
};

// Fetch a single matiere by ID
export const getMatiereById = async (id) => {
  try {
    const response = await axiosGenInstance.get(`/matieres/${id}`, {
      headers: {
        "Content-Type": "application/json", // Optional if already set globally
      },
    });
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching matiere by ID:", error);
    throw error; // Re-throw for further handling
  }
};

// Add a new matiere
export const addMatiere = async (payload) => {
  try {
    const response = await axiosGenInstance.post("/matieres", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the created matiere data
  } catch (error) {
    console.error("Error adding matiere:", error);
    throw error; // Re-throw the error for further handling
  }
};

// Update an existing matiere
export const updateMatiere = async (id, payload) => {
  try {
    const response = await axiosGenInstance.put(`/matieres/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the updated matiere data
  } catch (error) {
    console.error("Error updating matiere:", error);
    throw error; // Re-throw the error for further handling
  }
};

// Delete a matiere by ID
export const deleteMatiere = async (id) => {
  try {
    const response = await axiosGenInstance.delete(`/matieres/${id}`);
    return response.status === 204; // Return true if deletion was successful (no content)
  } catch (error) {
    console.error("Error deleting matiere:", error);
    throw error; // Re-throw the error for further handling
  }
};

// Search for matieres by a query key
export const searchMatieres = async (key) => {
  try {
    const response = await axiosGenInstance.get(`/matieres/search?key=${key}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return the list of matieres matching the search key
  } catch (error) {
    console.error("Error searching matieres:", error);
    throw error; // Re-throw the error for further handling
  }
};
