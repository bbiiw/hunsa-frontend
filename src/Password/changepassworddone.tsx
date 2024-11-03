import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <header>
        <Navbar />
      </header>

      <div className="flex flex-col justify-center items-center min-h-screen font-sans">
        <h1 className="text-2xl font-bold text-gray-800 mb-5">
          เปลี่ยนรหัสผ่านสำเร็จ
        </h1>
        <button
          className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>

      <footer className="absolute bottom-0 w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default SuccessPage;
