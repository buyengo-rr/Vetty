import React from 'react';

const About = () => {
  return (
    <div className="about-page" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>About Vetty</h1>
      <p>
        At <strong> Vetty</strong>, we understand that pets are more than just animals ;they are family. That’s why we’ve built a data-driven e-commerce platform designed to make pet care simple, reliable, and fast.
      </p>
      <p className="text-lg mb-4">
        Whether it’s midnight cravings for your cat, last-minute vet appointments, or a restock on vaccines and grooming essentials, Vetty connects you with trusted veterinary services and pet products right when you need them.
      </p>
      <p className="text-lg">
        Our mission is to bring pet wellness to your fingertips by combining smart inventory management, real-time service approvals, and a seamless ordering experience — all managed securely by an admin you can trust.
      </p>
      <p>
        From pet food and toys to vaccinations and grooming, Vetty ensures your pet’s needs are never out of reach.
      </p>
    </div>
  );
};

export default About;
