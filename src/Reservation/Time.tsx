import React, { useState } from "react";
import Layout from "../components/Layout_Customer";
import { useNavigate, useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";

const ReservationTime: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { date, employeeId, serviceId } = location.state || {};

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 9 + i;
    const displayTime = `${hour.toString().padStart(2, "0")}:00`; // Display format (hh:mm)
    const fullTime = `${displayTime}:00`; // Full format (hh:mm:ss)
    return { displayTime, fullTime };
  });

  const handleNext = () => {
    if (selectedTime) {
      navigate("/reservation/form", {
        state: { date, employeeId, serviceId, time: selectedTime },
      });
    }
  };

  return (
    <Layout>
      <div className="mt-32">
        <Breadcrumbs activeStep={2} />
      </div>

      <section className="m-8 max-w-xl mx-auto text-center">
        <h1 className="text-4xl mb-8">เวลาจอง</h1>
        <div className="grid grid-cols-4 gap-6 mb-10">
          {timeSlots.map(({ displayTime, fullTime }) => (
            <button
              key={fullTime}
              onClick={() => setSelectedTime(fullTime)}
              className={`px-6 py-3 rounded-lg ${selectedTime === fullTime ? "bg-yellow-200" : "bg-gray-200"}`}
            >
              {displayTime}
            </button>
          ))}
        </div>
        <button
          className="bg-success px-6 py-3 rounded-lg"
          onClick={handleNext}
          disabled={!selectedTime}
        >
          ต่อไป
        </button>
      </section>
    </Layout>
  );
};

export default ReservationTime;
