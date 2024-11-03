import React from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  button1?: string;
  button2?: string;
  button3?: string;
  button4?: string;
}

const Navbar: React.FC<NavbarProps> = ({
  button1,
  button2,
  button3,
  button4,
}) => {
  return (
    <nav className="navbar bg-secondary p-2 flex flex-col md:flex-row justify-between items-center fixed top-0 w-full z-10 backdrop-blur-xl">
      <img
        src="/assets/logo.png"
        alt="Logo"
        style={{ width: "auto", height: "75px" }}
      />

      <div className="flex flex-col md:flex-row items-center mt-4">
        <NavLink
          className="btn lg:mr-12 bg-[#5A3D5C] text-white hover:bg-[#3E2A4D]"
          to="/"
        >
          {button1}
        </NavLink>
        <NavLink
          className="btn lg:mr-12 bg-[#35524A] text-white hover:bg-[#2A413C]"
          to="/all_service"
        >
          {button2}
        </NavLink>
        <NavLink
          className="btn lg:mr-12 bg-[#6B4F4F] text-white hover:bg-[#543D3D]"
          to="/all_staff"
        >
          {button3}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
