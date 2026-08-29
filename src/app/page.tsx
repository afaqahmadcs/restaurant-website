"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Anatomy from "@/components/Anatomy";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Visit from "@/components/Visit";
import ReservationDrawer from "@/components/ReservationDrawer";
import Footer from "@/components/Footer";

export default function Home() {
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);

  const openReservations = () => setIsReservationsOpen(true);
  const closeReservations = () => setIsReservationsOpen(false);

  return (
    <div className="relative min-h-screen bg-background text-on-background selection:bg-primary selection:text-on-primary">
      {/* Navigation Header */}
      <Navbar onOpenReservations={openReservations} />

      {/* Main Sections */}
      <main>
        {/* Cinematic Hero */}
        <Hero onOpenReservations={openReservations} />

        {/* Narrative / Pillars */}
        <Story />

        {/* Deconstructed Anatomy of Burger */}
        <Anatomy />

        {/* Curated Diners Menu */}
        <Menu onOpenReservations={openReservations} />

        {/* Photo Gallery Grid */}
        <Gallery />

        {/* Location Hours Info & Map */}
        <Visit />
      </main>

      {/* Footer Branding */}
      <Footer />

      {/* fly-out reservation drawer */}
      <ReservationDrawer isOpen={isReservationsOpen} onClose={closeReservations} />
    </div>
  );
}
