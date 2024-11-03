// src/pages/Allservice.tsx

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout_Customer";
import CardItem from "../components/ServiceItem";
import { fetchServices, Service } from "../api/service";
import { useNavigate } from "react-router-dom";

const Allservice: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "All Service - Hansa Salon";

    const getServices = async () => {
      try {
        const serviceData = await fetchServices();
        setServices(serviceData);
      } catch (err) {
        console.error(err);
      }
    };

    getServices();
  }, []);

  const handleBookNow = (serviceId: string) => {
    navigate("/reservation/date", { state: { serviceId } });
  };

  return (
    <Layout>
      <main className="pt-32">
        <section className="ml-24">
          <h1 className="text-4xl font-bold mb-8">All Service</h1>
          <div className="flex flex-row">
            <button className="btn btn-accent w-24">ผม</button>
            <button className="btn btn-accent w-24 ml-12">ตา</button>
            <button className="btn btn-accent w-24 ml-12">มือ</button>
            <button className="btn btn-accent w-24 ml-12">เท้า</button>
          </div>
        </section>
        <section>
          <article>
            <CardItem services={services} onBookNow={handleBookNow} />
          </article>
        </section>
      </main>
    </Layout>
  );
};

export default Allservice;
