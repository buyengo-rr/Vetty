import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import "../styles/pages.css"

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/services", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then(setServices)
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  return (
    <div className="service-list">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};

export default ServiceList;
