// src/components/ServiceList.tsx

import React from "react";
import { NavLink } from "react-router-dom";

interface Service {
  _id: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  description?: string;
  price?: number;
}

interface ServiceListProps {
  services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  return (
    <div className="grid grid-cols-3 p-12 gap-24">
      {services.map((service) => (
        <div className="card bg-base-100 w-96 shadow-xl" key={service._id}>
          <figure>
            <img
              src={service.imgSrc}
              alt={service.imgAlt}
              style={{ width: "auto", height: "250px" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{service.title}</h2>
            {service.price !== undefined && (
              <p className="text-lg font-bold text-right">
                ราคา: {service.price.toFixed(2)} บาท
              </p>
            )}
            {service.description && (
              <p className="text-gray-500">{service.description}</p>
            )}
            <div className="card-actions justify-end">
              <NavLink className="btn btn-primary" to={`/reservation/date`}>
                Book Now
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
