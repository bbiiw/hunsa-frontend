// src/components/ServiceItem.tsx

import React from "react";

interface Service {
  _id: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  description?: string;
  price?: number;
}

interface CardItemProps {
  services: Service[];
  onBookNow: (serviceId: string) => void;
}

const ServiceItem: React.FC<CardItemProps> = ({ services, onBookNow }) => {
  return (
    <div>
      {services.map((service) => (
        <div
          className="card bg-base-100 shadow-xl grid grid-cols-3 p-12 gap-6"
          key={service._id}
        >
          <figure>
            <img
              src={service.imgSrc}
              alt={service.imgAlt}
              style={{ width: "auto", height: "275px" }}
              className="rounded-lg"
            />
          </figure>
          <div className="card-body">
            <div className="flex justify-between">
              <h2 className="card-title">{service.title}</h2>
              {service.price !== undefined && (
                <p className="text-lg font-bold text-right">
                  ราคา: {service.price.toFixed(2)} บาท
                </p>
              )}
            </div>
            {service.description && (
              <p className="text-gray-500">{service.description}</p>
            )}
            <button
              className="btn btn-neutral w-48"
              onClick={() => onBookNow(service._id)}
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceItem;
