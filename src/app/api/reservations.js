import axiosGenInstance from "./services/axiosGenInstance";

export const getAllReservations = async () => {
  try {
    const response = await axiosGenInstance.get("/reservations");
    return response.data;
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error;
  }
};

export const getProfesseurReservations = async (professeurId) => {
  try {
    const response = await axiosGenInstance.get(
      `/reservations/professeur/${professeurId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching professeur reservations:", error);
    throw error;
  }
};

export const addReservation = async (payload) => {
  try {
    const response = await axiosGenInstance.post("/reservations", payload, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding reservation:", error);
    throw error;
  }
};

export const deleteReservation = async (id) => {
  try {
    const response = await axiosGenInstance.delete(`/reservations/${id}`);
    return response.status === 204; // Return true if deletion succeeded
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw error;
  }
};

export const getCurrentWeek = async () => {
  try {
    const response = await axiosGenInstance.get("/reservations/week");
    return response.data;
  } catch (error) {
    console.error("Error fetching current week:", error);
    throw error;
  }
};

export const getCurrentDay = async () => {
  try {
    const response = await axiosGenInstance.get("/reservations/day");
    return response.data;
  } catch (error) {
    console.error("Error fetching current day:", error);
    throw error;
  }
};
