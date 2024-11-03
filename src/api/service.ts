import axios from "axios";

export interface Service {
  _id: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  description?: string;
  price?: number;
}

const API_URL = "http://localhost:8080/api/services";

// Fetch all services
export const fetchServices = async (): Promise<Service[]> => {
  try {
    const response = await axios.get<Service[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

// Fetch a service by ID
export const fetchServiceById = async (id: number): Promise<Service> => {
  try {
    const response = await axios.get<Service>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching service with ID ${id}:`, error);
    throw error;
  }
};

// Create a new service
export const createService = async (
  service: Omit<Service, "_id">,
): Promise<Service> => {
  try {
    const response = await axios.post<{ message: string; service: Service }>(
      API_URL,
      service,
    );
    return response.data.service;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

// Update an existing service
export const updateService = async (
  id: number,
  service: Partial<Omit<Service, "_id">>,
): Promise<Service> => {
  try {
    const response = await axios.put<{
      message: string;
      updatedService: Service;
    }>(`${API_URL}/${id}`, service);
    return response.data.updatedService;
  } catch (error) {
    console.error(`Error updating service with ID ${id}:`, error);
    throw error;
  }
};

// Delete a service
export const deleteService = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting service with ID ${id}:`, error);
    throw error;
  }
};
