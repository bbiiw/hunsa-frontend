// src/Authen/Login.tsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { loginEmployee } from "../api/employee";
import AdminNavbar from "../components/AdminNavbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const response = await loginEmployee(email, password);
      login(response.employee); // บันทึกข้อมูลผู้ใช้ใน context และ localStorage
      navigate("/admin");
    } catch (error: any) {
      console.log(error.response.data);
      setErrorMessage("Invalid email or password");
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
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="mb-4 text-left">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email or Username
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded border-gray-300"
                placeholder="Email or Username"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded border-gray-300"
                placeholder="Password"
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-red-500 hover:bg-red-600 text-white rounded font-medium"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4">
            <Link
              to="/admin/register"
              className="block text-blue-500 hover:underline mt-2"
            >
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default LoginPage;
