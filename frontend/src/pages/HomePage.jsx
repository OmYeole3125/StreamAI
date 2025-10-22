import React from "react";
import Home from "../components/Home";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <div className="h-screen bg-base-200">
      <Navbar />
      <Home />
    </div>
  );
};

export default HomePage;
