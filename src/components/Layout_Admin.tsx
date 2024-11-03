// src/components/Layout.tsx

import React from "react";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import "./Layout.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen kanit-regular">
      <header>
        <AdminNavbar />
      </header>

      <main>{children}</main>

      <footer className="bg-gray-800">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
