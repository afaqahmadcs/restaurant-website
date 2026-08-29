"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Anatomy from "@/components/Anatomy";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Visit from "@/components/Visit";
import ReservationDrawer from "@/components/ReservationDrawer";
import Footer from "@/components/Footer";
import Lenis from "lenis";

export default function Home() {
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);

  useEffect(() => {
    // Initialise Lenis smooth scroller
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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
