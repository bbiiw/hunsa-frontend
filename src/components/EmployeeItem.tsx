import React from "react";
import { NavLink } from "react-router-dom";

interface Employee {
  _id: string;
  imgSrc?: string;
  username: string;
  description?: string;
}

interface CardItemProps {
  employees: Employee[];
}

const EmployeeItem: React.FC<CardItemProps> = ({ employees }) => {
  return (
    <div>
      {employees.map((employee) => (
        <div
          className="card bg-base-100 shadow-xl grid grid-cols-3 p-12 gap-6"
          key={employee._id}
        >
          <figure>
            <img
              src={employee.imgSrc}
              alt={employee.username}
              style={{ width: "auto", height: "275px" }}
              className="rounded-lg"
            />
          </figure>
          <div className="card-body">
            <div className="flex justify-between">
              <h2 className="card-title"> ช่าง {employee.username}</h2>
            </div>
            {employee.description && (
              <p className="text-gray-500">{employee.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeItem;
