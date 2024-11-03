// src/pages/Allstaff.tsx

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout_Customer";
import EmployeeItem from "../components/EmployeeItem";
import { fetchAllEmployees, Employee } from "../api/employee";

const Allstaff: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    document.title = "All Staff - Hansa Salon";

    // Fetch employees from the API
    const getEmployees = async () => {
      try {
        const employeeData = await fetchAllEmployees();
        setEmployees(employeeData);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    getEmployees();
  }, []);

  return (
    <Layout>
      <main className="pt-32">
        <section>
          <article>
            <EmployeeItem employees={employees} />
          </article>
        </section>
      </main>
    </Layout>
  );
};

export default Allstaff;
