import axios from "axios";

export interface Employee {
  _id: string;
  username: string;
  password: string;
  email: string;
  imgSrc?: string;
  status: string;
  createAt?: string;
  updatedAt?: string;
}

const API_URL = "http://localhost:8080/api/employees";

// Register a new employee
export const registerEmployee = async (
  employee: Omit<Employee, "_id" | "status" | "createAt" | "updatedAt">,
): Promise<{ message: string; employee: Employee }> => {
  try {
    const response = await axios.post<{ message: string; employee: Employee }>(
      `${API_URL}/register`,
      employee,
    );
    return response.data;
  } catch (error) {
    console.error("Error registering employee:", error);
    throw error;
  }
};

// Login an employee
export const loginEmployee = async (
  email_username: string,
  password: string,
): Promise<{ message: string; employee: Employee }> => {
  try {
    const response = await axios.post<{ message: string; employee: Employee }>(
      `${API_URL}/login`,
      { email_username, password },
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in employee:", error);
    throw error;
  }
};

// Fetch all employees
export const fetchAllEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await axios.get<Employee[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all employees:", error);
    throw error;
  }
};

// Update an employee's status
export const updateEmployeeStatus = async (
  id: string,
  status: string,
): Promise<{ message: string; employee: Employee }> => {
  try {
    const response = await axios.put<{ message: string; employee: Employee }>(
      `${API_URL}/${id}/status`,
      { status },
    );
    return response.data;
  } catch (error) {
    console.error("Error updating employee status:", error);
    throw error;
  }
};

// Update an employee's details
export const updateEmployee = async (
  id: string,
  employee: Partial<Omit<Employee, "id" | "createAt" | "updatedAt">>,
): Promise<{ message: string; employee: Employee }> => {
  try {
    const response = await axios.put<{ message: string; employee: Employee }>(
      `${API_URL}/${id}/edit`,
      employee,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

// Change an employee's password
export const changeEmployeePassword = async (
  id: string,
  password: string,
): Promise<{ message: string }> => {
  try {
    const response = await axios.put<{ message: string }>(
      `${API_URL}/${id}/password`,
      { password },
    );
    return response.data;
  } catch (error) {
    console.error("Error changing employee password:", error);
    throw error;
  }
};
