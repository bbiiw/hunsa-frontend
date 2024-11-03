// src/pages/RegisterPage.tsx

import React, { useState, ChangeEvent, FormEvent } from "react";
import Footer from "../components/Footer";
import { registerEmployee } from "../api/employee";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await registerEmployee(formData);
      setSuccessMessage(response.message);
      // Redirect to login page after a short delay to show success message
      setTimeout(() => navigate("/admin/login"), 2000);
    } catch (error: any) {
      setErrorMessage(error || "Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <header>
        <AdminNavbar />
      </header>

      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center bg-white/50"
        style={{ backgroundImage: "url('../../public/assets/homepage_1.jpg')" }}
      >
        <div className="bg-white/80 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-left">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full p-2 border rounded border-gray-300"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 text-left">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded border-gray-300"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 text-left">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border rounded border-gray-300"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded font-medium"
            >
              Register
            </button>
            {errorMessage && (
              <p className="mt-4 text-sm text-red-500">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="mt-4 text-sm text-green-500">{successMessage}</p>
            )}
          </form>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RegisterPage;
