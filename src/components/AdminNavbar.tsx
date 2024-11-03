// src/components/AdminNavbar.tsx

import React from "react";
import { NavLink } from "react-router-dom";

interface AdminNavbarProps {
  button1?: string;
  button2?: string;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({
  button1 = "Profile",
  button2 = "See Service",
}) => {
  return (
    <nav className="navbar bg-secondary p-4 flex flex-col md:flex-row justify-between items-center fixed top-0 w-full z-10 backdrop-blur-xl">
      <img
        src="/assets/logo.png"
        alt="Logo"
        style={{ width: "auto", height: "75px" }}
      />

      <div className="flex flex-col md:flex-row items-center mt-4">
        <NavLink className="btn btn-outline lg:mr-12" to="/admin">
          {button1}
        </NavLink>
        <NavLink className="btn btn-outline lg:mr-12" to="/admin/history">
          {button2}
        </NavLink>
        <NavLink
          className="btn btn-outline btn-error lg:mr-12"
          to="/admin/login"
        >
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default AdminNavbar;
