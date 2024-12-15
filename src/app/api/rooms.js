import axios from "axios";
import axiosGenInstance from "./services/axiosGenInstance";

// Fetch all salles
export const getAllSalles = async () => {
  try {
    const response = await axiosGenInstance.get("/salles");
    return response.data;
  } catch (error) {
    console.error("Error fetching all salles:", error);
    throw error;
  }
};

// Fetch a single salle by ID
export const getSalleById = async (id) => {
  try {
    const response = await axiosGenInstance.get(`/salles/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching salle by ID:", error);
    throw error;
  }
};

// Add a new salle
export const addSalle = async (payload) => {
  try {
    const response = await axiosGenInstance.post("/salles", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding salle:", error);
    throw error;
  }
};

export const getFreeSallePerDayAndWeekAndSceance = async (payload) => {
  try {
    const response = await axiosGenInstance.post(
      "/salles/free-day-week-seance",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching free salles:", error);
    throw error;
  }
};

// Update an existing salle by ID
export const updateSalle = async (id, payload) => {
  try {
    const response = await axiosGenInstance.put(`/salles/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating salle:", error);
    throw error;
  }
};

// Delete a salle by ID
export const deleteSalle = async (id) => {
  try {
    const response = await axiosGenInstance.delete(`/salles/${id}`);
    return response.status === 204;
  } catch (error) {
    console.error("Error deleting salle:", error);
    throw error;
  }
};
