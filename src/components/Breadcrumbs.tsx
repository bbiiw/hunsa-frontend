// src/components/Breadcrumbs.tsx

import React from "react";

interface BreadcrumbsProps {
  activeStep: number;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ activeStep }) => {
  const steps = ["เลือกวันที่", "เลือกช่าง", "เลือกเวลา", "กรอกข้อมูล"];

  return (
    <div className="breadcrumbs text-md py-4 flex justify-center">
      <ul className="flex space-x-2">
        {steps.map((step, index) => (
          <li key={index}>
            <span
              className={`${
                index === activeStep
                  ? "font-medium text-black"
                  : "text-gray-500"
              }`}
            >
              {step}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
