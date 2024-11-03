import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout_Customer";
import CardList from "../../components/ServiceList"; // Ensure this imports your ServiceList component correctly
import { fetchServices } from "../../api/service"; // Adjust the import path as necessary
import { NavLink } from "react-router-dom";

interface Service {
  _id: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  description?: string;
  price?: number;
}

const Homepage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Hansa Salon";

    const getServices = async () => {
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Error fetching services",
        );
      } finally {
        setLoading(false);
      }
    };

    getServices();
  }, []);

  return (
    <Layout>
      <section>
        <article>
          <img
            src="/assets/homepage_1.jpg"
            alt="Homepage background"
            className="w-full h-screen blur-md"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold mb-4 animate">Hansa Salon</h1>
            <p className="text-2xl mb-8 text-gray-700">Beauty Salon Services</p>
            <div className="flex flex-row">
              <NavLink className="btn btn-base-200 mr-4" to="/all_staff">
                Our Staff
              </NavLink>
              <NavLink className="btn btn-primary" to="/all_service">
                All Services
              </NavLink>
            </div>
          </div>
        </article>
      </section>

      <section>
        <article className="m-16">
          <h1 className="text-4xl font-bold">New Services!</h1>
          <p className="text-2xl text-gray-500">Let’s Try</p>
        </article>
        <article>
          <CardList services={services} />
        </article>
      </section>
    </Layout>
  );
};

export default Homepage;
