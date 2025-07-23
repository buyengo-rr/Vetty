import React from 'react';
import Footer from '../components/common/Footer';

const About = () => {
  return (
    <>
      <div className="about-page" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: 'blue' }}>About Vetty</h1>
        <p>
          At <strong>Vetty</strong>, we understand that pets are more than just animals; they are family. That’s why we’ve built a data-driven e-commerce platform designed to make pet care simple, reliable, and fast.
        </p>
        <p className="text-lg mb-4">
          Whether it’s midnight cravings for your cat, last-minute vet appointments, or a restock on vaccines and grooming essentials, Vetty connects you with trusted veterinary services and pet products right when you need them.
        </p>
        <p className="text-lg mb-4">
          From pet food and toys to vaccinations and grooming, Vetty ensures your pet’s needs are never out of reach.
        </p>

        <h2 style={{ textAlign: 'center', color: 'blue' }}>Our Mission</h2>
        <p className="text-lg mb-4">
          Our mission is to bring pet wellness to your fingertips by combining smart inventory management, real-time service approvals, and a seamless ordering experience , all managed securely by an admin you can trust.
        </p>

        <h2 style={{ textAlign: 'center', color: 'blue' }}>Our Vision</h2>
        <p className="text-lg mb-4">
          To become the leading digital companion for pet wellness in Africa by making veterinary services and pet care products accessible to every pet owner.
        </p>

        <h2 style={{ textAlign: 'center', color: 'blue' }}>Our Values</h2>
        <ul className="text-lg list-disc list-inside space-y-2">
          <li>Compassion</li>
          <li>Trust</li>
          <li>Innovation</li>
          <li>Accessibility</li>
          <li>Integrity</li>
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default About;
