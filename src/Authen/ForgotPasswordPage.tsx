// src/Authen/ForgotPasswordPage.tsx

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // ดำเนินการส่งอีเมลสำหรับรีเซ็ตรหัสผ่าน (การเชื่อมต่อ backend หรือ mock response)
    setMessage(
      "If this email is registered, you will receive password reset instructions.",
    );
  };

  return (
    <div>
      <header>
        <Navbar />
      </header>

      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center bg-white/50"
        style={{ backgroundImage: "url('../../public/assets/homepage_1.jpg')" }}
      >
        <div className="bg-white/80 p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>
          <form className="forgot-password-form" onSubmit={handleSubmit}>
            <div className="mb-4 text-left">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Enter your Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded border-gray-300"
                placeholder="Email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium"
            >
              Send Reset Instructions
            </button>
            {message && (
              <p className="mt-4 text-sm text-green-500">{message}</p>
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

export default ForgotPasswordPage;
