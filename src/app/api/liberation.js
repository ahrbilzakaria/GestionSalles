import axiosGenInstance from "./services/axiosGenInstance";

// Fetch all liberations
export const getAllLiberations = async () => {
  try {
    const response = await axiosGenInstance.get("/liberations");
    return response.data;
  } catch (error) {
    console.error("Error fetching liberations:", error);
    throw error;
  }
};

// Fetch liberations by professeurId
export const getLiberationsByProfesseurId = async (professeurId) => {
  try {
    const response = await axiosGenInstance.get(
      `/liberations/professeur/${professeurId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching professeur liberations:", error);
    throw error;
  }
};

// Fetch current week
export const getCurrentWeek = async () => {
  try {
    const response = await axiosGenInstance.get("/liberations/week");
    return response.data;
  } catch (error) {
    console.error("Error fetching current week:", error);
    throw error;
  }
};

// Fetch liberations by week
export const getLiberationsByWeek = async (week) => {
  try {
    const response = await axiosGenInstance.get(`/liberations/week/${week}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching liberations by week:", error);
    throw error;
  }
};

// Fetch current day
export const getCurrentDay = async () => {
  try {
    const response = await axiosGenInstance.get("/liberations/day");
    return response.data;
  } catch (error) {
    console.error("Error fetching current day:", error);
    throw error;
  }
};

// Add a new liberation
export const addLiberation = async (payload, emploiDuTempsId) => {
  try {
    const response = await axiosGenInstance.post(
      `/liberations/emploi-du-temps/${emploiDuTempsId}`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a liberation
export const deleteLiberation = async (id) => {
  try {
    const response = await axiosGenInstance.delete(`/liberations/${id}`);
    return response.status === 204; // Return true if deletion succeeded
  } catch (error) {
    console.error("Error deleting liberation:", error);
    throw error;
  }
};
