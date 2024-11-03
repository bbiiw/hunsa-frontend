// src/pages/ReservationDate.tsx

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout_Customer";
import Breadcrumbs from "../components/Breadcrumbs";

const ReservationDate: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId } = location.state || {}; // รับ `serviceId` จาก state

  const handleNext = () => {
    // ส่ง `serviceId` และวันที่ไปยังหน้าเลือกช่าง
    if (selectedDate) {
      navigate("/reservation/beautician", {
        state: { date: selectedDate, serviceId },
      });
    }
  };

  return (
    <Layout>
      <div className="mt-32">
        <Breadcrumbs activeStep={0} />
      </div>
      <section>
        <article>
          <div className="m-32 max-w-lg mx-auto">
            <div className="m-12">
              <label className="input input-bordered flex items-center gap-2 text-lg lg:text-2xl w-full lg:w-auto">
                วันที่จอง
                <input
                  type="date"
                  className="grow w-20"
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </label>
            </div>
            <div className="m-12">
              <button
                className="btn btn-success font-normal"
                onClick={handleNext}
                disabled={!selectedDate}
              >
                ต่อไป
              </button>
            </div>
          </div>
        </article>
      </section>
    </Layout>
  );
};

export default ReservationDate;
