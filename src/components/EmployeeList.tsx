// src/components/EmployeeList.tsx

import React from "react";
import { useNavigate } from "react-router-dom";

interface Employee {
  _id: string;
  username: string;
  imgSrc?: string;
  description?: string;
  status: string;
}

interface EmployeeListProps {
  employees: Employee[];
  onSelectEmployee: (employeeId: string) => void; // เพิ่ม onSelectEmployee ที่นี่
}

const EmployeeList: React.FC<EmployeeListProps> = ({
  employees,
  onSelectEmployee,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = (employeeId: string, status: string) => {
    if (status === "available") {
      onSelectEmployee(employeeId); // เรียกใช้ onSelectEmployee เมื่อเลือกช่าง
    }
  };

  return (
    <div className="grid grid-cols-3 p-12 gap-24">
      {employees.map((employee) => (
        <div className="card bg-base-100 w-96 shadow-xl" key={employee._id}>
          <figure>
            <img
              src={employee.imgSrc || "/default-image.jpg"}
              alt={employee.username}
              style={{ width: "auto", height: "250px" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{employee.username}</h2>
            {employee.description && (
              <p className="text-gray-500">{employee.description}</p>
            )}
            <button
              className={`btn ${employee.status === "available" ? "btn-accent" : "btn-error"}`}
              onClick={() => handleButtonClick(employee._id, employee.status)}
              disabled={employee.status !== "available"}
            >
              {employee.status === "available" ? "Available" : "Unavailable"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
