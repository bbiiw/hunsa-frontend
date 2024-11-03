// src/pages/ReservationBeautician.tsx

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout_Customer";
import EmployeeList from "../components/EmployeeList";
import Breadcrumbs from "../components/Breadcrumbs";
import { fetchAllEmployees, Employee } from "../api/employee";
import { useNavigate, useLocation } from "react-router-dom";

const ReservationBeautician: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { date, serviceId } = location.state || {};

  useEffect(() => {
    document.title = "List of Beautician";
    const loadEmployees = async () => {
      try {
        const employeeData = await fetchAllEmployees();
        setEmployees(employeeData);
      } catch (error) {
        console.error("Error loading employees:", error);
      }
    };
    loadEmployees();
  }, []);

  const handleSelectEmployee = (employeeId: string) => {
    navigate(`/reservation/time`, { state: { date, serviceId, employeeId } });
  };

  return (
    <Layout>
      <div className="mt-32">
        <Breadcrumbs activeStep={1} />
      </div>
      <section>
        <article>
          <EmployeeList
            employees={employees}
            onSelectEmployee={handleSelectEmployee}
          />
        </article>
      </section>
    </Layout>
  );
};

export default ReservationBeautician;
