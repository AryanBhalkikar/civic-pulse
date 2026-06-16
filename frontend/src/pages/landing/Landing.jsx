import React from "react";
import { Link } from "react-router-dom";

import "./Landing.css"
import Navbar from "./Navbar.jsx";
import Hero from './Hero.jsx';
import HowItWorks from './HowItWorks.jsx';
// import Stats from './Stats.jsx';
import HeatmapPreview from './HeatmapPreview.jsx';
// import Footer from './Footer.jsx';

export default function Landing() {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <HowItWorks />
    </div>
  );
}