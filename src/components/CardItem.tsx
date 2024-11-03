import React from "react";
import { NavLink } from "react-router-dom";

interface Service {
  id: number;
  imgSrc: string;
  imgAlt: string;
  title: string;
  description?: string;
  price?: number;
}

interface CardItemProps {
  services: Service[];
}

const CardItem: React.FC<CardItemProps> = ({ services }) => {
  return (
    <div>
      {services.map((service) => (
        <div
          className="card bg-base-100 shadow-xl grid grid-cols-3 p-12 gap-6"
          key={service.id}
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
            {service.price !== undefined && (
              <NavLink
                className="btn btn-neutral w-48"
                to={`/reservation/date`}
              >
                Book Now
              </NavLink>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardItem;
