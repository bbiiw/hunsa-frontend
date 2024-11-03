// src/pages/ReservationForm.tsx

import React, { useState } from "react";
import Layout from "../components/Layout_Customer";
import Breadcrumbs from "../components/Breadcrumbs";
import { bookReservation } from "../api/reservation";
import { useLocation, useNavigate } from "react-router-dom";

const ReservationForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { date, employeeId, serviceId, time } = location.state || {};

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(name, email, phone, employeeId, serviceId, date, time);
    try {
      await bookReservation({
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        employeeId,
        serviceId,
        reservationDate: date,
        reservationTime: time,
      });
      navigate("/");
    } catch (error) {
      console.error("Error submitting reservation:", error);
    }
  };

  return (
    <Layout>
      <div className="mt-32">
        <Breadcrumbs activeStep={3} />
      </div>
      <div className="m-10 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">ชื่อ</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full bg-white"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full bg-white"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">เบอร์โทร</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered w-full bg-white"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              รายละเอียดเพิ่มเติม
            </label>
            <textarea
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="อธิบายเพิ่มเติม..."
              className="textarea textarea-bordered w-full bg-white"
            />
          </div>
          <button
            type="submit"
            className="btn btn-error w-full text-white font-semibold py-3"
          >
            จองคิว
          </button>
          <p className="text-red-500 font-semibold mt-4 text-center">
            หมายเหตุ: หากยกเลิกการจองแล้วจะต้องชำระเงินหลังใช้บริการแล้วเท่านั้น
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default ReservationForm;
