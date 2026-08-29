"use client";

import React, { useState, useEffect } from "react";

interface NavbarProps {
  onOpenReservations: () => void;
}

export default function Navbar({ onOpenReservations }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Scroll Spy using Intersection Observer
  useEffect(() => {
    const sections = ["hero", "menu", "story", "gallery", "visit"];
    const activeObservers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-25% 0px -55% 0px" // Trigger when segment is in main viewport focus
        }
      );
      
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      activeObservers.forEach(obs => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-dim/80 backdrop-blur-md flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 border-b border-outline-variant/10">
      {/* Brand logo */}
      <a
        className="font-headline-sm text-headline-sm text-primary tracking-tighter uppercase select-none cursor-pointer"
        href="#hero"
      >
        Ember & Grain
      </a>

      {/* Desktop Links (Scroll Spy Active states) */}
      <div className="hidden md:flex gap-8 items-center">
        <a
          className={`transition-colors duration-300 font-label-caps text-label-caps uppercase cursor-pointer border-b pb-0.5 ${
            activeSection === "menu"
              ? "text-primary border-primary font-bold"
              : "text-on-surface-variant hover:text-primary border-transparent"
          }`}
          href="#menu"
        >
          Menu
        </a>
        <a
          className={`transition-colors duration-300 font-label-caps text-label-caps uppercase cursor-pointer border-b pb-0.5 ${
            activeSection === "story"
              ? "text-primary border-primary font-bold"
              : "text-on-surface-variant hover:text-primary border-transparent"
          }`}
          href="#story"
        >
          Experience
        </a>
        <a
          className={`transition-colors duration-300 font-label-caps text-label-caps uppercase cursor-pointer border-b pb-0.5 ${
            activeSection === "gallery"
              ? "text-primary border-primary font-bold"
              : "text-on-surface-variant hover:text-primary border-transparent"
          }`}
          href="#gallery"
        >
          Gallery
        </a>
        <a
          className={`transition-colors duration-300 font-label-caps text-label-caps uppercase cursor-pointer border-b pb-0.5 ${
            activeSection === "visit"
              ? "text-primary border-primary font-bold"
              : "text-on-surface-variant hover:text-primary border-transparent"
          }`}
          href="#visit"
        >
          Location
        </a>
      </div>

      {/* Actions (Reservation CTA and Mobile Hamburger) */}
      <div className="flex items-center gap-4">
        <button
          className="bg-primary text-on-primary font-label-caps text-label-caps uppercase px-6 py-3 hover:opacity-85 transition-opacity cursor-pointer btn-sharp"
          onClick={onOpenReservations}
        >
          Reservations
        </button>
        <button
          className="md:hidden text-primary focus:outline-none cursor-pointer flex items-center justify-center"
          aria-label="Toggle Mobile Menu"
          onClick={toggleMobileMenu}
        >
          <span className="material-symbols-outlined text-3xl select-none">
            {mobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Drawer Dropdown Menu (Animate via CSS transforms) */}
      <div
        className={`absolute top-full left-0 w-full bg-surface-container-low/95 backdrop-blur-lg border-b border-outline-variant/20 flex flex-col px-margin-mobile py-6 gap-4 md:hidden z-40 transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-4 invisible pointer-events-none"
        }`}
      >
        <a
          className={`transition-colors font-label-caps text-label-caps uppercase py-3 border-b border-outline-variant/10 cursor-pointer ${
            activeSection === "menu" ? "text-primary font-bold" : "text-on-surface-variant"
          }`}
          href="#menu"
          onClick={() => setMobileMenuOpen(false)}
        >
          Menu
        </a>
        <a
          className={`transition-colors font-label-caps text-label-caps uppercase py-3 border-b border-outline-variant/10 cursor-pointer ${
            activeSection === "story" ? "text-primary font-bold" : "text-on-surface-variant"
          }`}
          href="#story"
          onClick={() => setMobileMenuOpen(false)}
        >
          Experience
        </a>
        <a
          className={`transition-colors font-label-caps text-label-caps uppercase py-3 border-b border-outline-variant/10 cursor-pointer ${
            activeSection === "gallery" ? "text-primary font-bold" : "text-on-surface-variant"
          }`}
          href="#gallery"
          onClick={() => setMobileMenuOpen(false)}
        >
          Gallery
        </a>
        <a
          className={`transition-colors font-label-caps text-label-caps uppercase py-3 cursor-pointer ${
            activeSection === "visit" ? "text-primary font-bold" : "text-on-surface-variant"
          }`}
          href="#visit"
          onClick={() => setMobileMenuOpen(false)}
        >
          Location
        </a>
      </div>
    </nav>
  );
}
