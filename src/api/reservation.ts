import axios from "axios";

export interface Reservation {
  _id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  employeeId: string;
  serviceId: string;
  reservationDate: string;
  reservationTime: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_URL = "http://localhost:8080/api/reservation";

// 1. Book a New Reservation
export const bookReservation = async (
  reservationData: Omit<
    Reservation,
    "_id" | "status" | "createdAt" | "updatedAt"
  >,
): Promise<{ message: string; reservation: Reservation }> => {
  try {
    const response = await axios.post<{
      message: string;
      reservation: Reservation;
    }>(`${API_URL}/book`, reservationData);
    return response.data;
  } catch (error) {
    console.error("Error booking reservation:", error);
    throw error;
  }
};

// 2. Get Reservations by Employee
export const getReservationsByEmployee = async (
  employeeId: string,
): Promise<{ reservations: Reservation[] }> => {
  try {
    const response = await axios.get<{ reservations: Reservation[] }>(
      `${API_URL}/${employeeId}`,
    );
    return response.data; // This should be an object with a `reservations` property
  } catch (error) {
    console.error("Error fetching reservations for employee:", error);
    throw error;
  }
};

// 3. Update Reservation Status
export const updateReservationStatus = async (
  reservationId: string,
): Promise<{ message: string; reservation: Reservation }> => {
  try {
    const response = await axios.put<{
      message: string;
      reservation: Reservation;
    }>(`${API_URL}/${reservationId}/confirm`);
    return response.data;
  } catch (error) {
    console.error("Error updating reservation status:", error);
    throw error;
  }
};

// 4. Cancel a Reservation
export const cancelReservation = async (
  reservationId: string,
): Promise<{ message: string; reservation: Reservation }> => {
  try {
    const response = await axios.put<{
      message: string;
      reservation: Reservation;
    }>(`${API_URL}/${reservationId}/cancel`);
    return response.data;
  } catch (error) {
    console.error("Error canceling reservation:", error);
    throw error;
  }
};
