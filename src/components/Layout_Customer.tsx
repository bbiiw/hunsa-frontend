// src/components/Layout.tsx

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Layout.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen kanit-regular">
      <header className="shadow-md">
        <Navbar
          button1="Home Page"
          button2="All Service"
          button3="Our Staff"
          button4="Book now"
        />
      </header>

      <main className="flex-grow p-6">{children}</main>

      <footer className="bg-gray-800">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
