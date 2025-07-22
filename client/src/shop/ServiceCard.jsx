import { useNavigate } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/user/appointment", { state: { selectedService: service } });
  };

  return (
    <div className="service-card">
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <p>${service.price}</p>
      <button onClick={handleBookNow} className="book-btn">Book Now</button>
    </div>
  );
};

export default ServiceCard