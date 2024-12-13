import axiosGenInstance from "./services/axiosGenInstance";

// Fetch all emplois du temps for a specific filiere
export const getAllEmploisDuTemps = async (filiereId) => {
  try {
    const response = await axiosGenInstance.get(
      `/emplois_du_temps/filiere/${filiereId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all emplois du temps:", error);
    throw error;
  }
};

// Fetch a single emploi du temps by ID
export const getEmploiDuTempsById = async (id) => {
  try {
    const response = await axiosGenInstance.get(`/emplois_du_temps/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching emploi du temps by ID:", error);
    throw error;
  }
};

// Fetch all emplois du temps for a specific professeur
export const getEmploisDuTempsByProfesseurId = async (professeurId) => {
  try {
    const response = await axiosGenInstance.get(
      `/emplois_du_temps/professeur/${professeurId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching emplois du temps by professeur ID:", error);
    throw error;
  }
};

// Add a new emploi du temps for a specific filiere
export const addEmploiDuTemps = async (payload, filiereId) => {
  try {
    const response = await axiosGenInstance.post(
      `/emplois_du_temps/filiere/${filiereId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding emploi du temps:", error);
    throw error;
  }
};

// Update an existing emploi du temps by ID
export const updateEmploiDuTemps = async (id, payload) => {
  try {
    const response = await axiosGenInstance.put(
      `/emplois_du_temps/${id}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating emploi du temps:", error);
    throw error;
  }
};

// Delete an emploi du temps by ID
export const deleteEmploiDuTemps = async (id) => {
  try {
    const response = await axiosGenInstance.delete(`/emplois_du_temps/${id}`, {
      headers: {},
    });
    return response.status === 204;
  } catch (error) {
    console.error("Error deleting emploi du temps:", error);
    throw error;
  }
};

// Delete all emplois du temps for a specific filiere
export const deleteEmploiDuTempsByFiliereId = async (filiereId) => {
  try {
    const response = await axiosGenInstance.delete(
      `/emplois_du_temps/filiere/${filiereId}`,
      {
        headers: {},
      }
    );
    return response.status === 204;
  } catch (error) {
    console.error("Error deleting emplois du temps by filiere ID:", error);
    throw error;
  }
};
