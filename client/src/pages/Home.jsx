import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function Home() {
  return (
    <div className="home-container">
      <Header />
      <main></main>
      <Footer />
    </div>
  );
}