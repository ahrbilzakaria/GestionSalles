import axiosGenInstance from "./services/axiosGenInstance"; // Ensure you have a configured Axios instance

// Get all charges horaires by filiere ID
export const getAllChargesHoraires = async (filiereId) => {
  try {
    const response = await axiosGenInstance.get(
      `/charges-horaires/filiere/${filiereId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching charges horaires:", error);
    throw error;
  }
};

// Get a charge horaire by ID
export const getChargeHoraireById = async (id) => {
  try {
    const response = await axiosGenInstance.get(`/charges-horaires/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching charge horaire by ID:", error);
    throw error;
  }
};

// Add a new charge horaire
export const addChargeHoraire = async (payload, filiereId, matiereId) => {
  try {
    const response = await axiosGenInstance.post(
      `/charges-horaires/filiere/${filiereId}/matiere/${matiereId}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error adding charge horaire:", error);
    throw error;
  }
};

// Update a charge horaire by ID
export const updateChargeHoraire = async (id, payload) => {
  try {
    const response = await axiosGenInstance.put(
      `/charges-horaires/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error updating charge horaire:", error);
    throw error;
  }
};

// Delete a charge horaire by ID
export const deleteChargeHoraire = async (id) => {
  try {
    const response = await axiosGenInstance.delete(`/charges-horaires/${id}`);
    return response.status === 204; // Check if deletion was successful
  } catch (error) {
    console.error("Error deleting charge horaire:", error);
    throw error;
  }
};
