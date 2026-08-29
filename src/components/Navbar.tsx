"use client";

import React, { useState } from "react";

interface NavbarProps {
  onOpenReservations: () => void;
}

export default function Navbar({ onOpenReservations }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-dim/80 backdrop-blur-md flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6">
      {/* Brand logo */}
      <a
        className="font-headline-sm text-headline-sm text-primary tracking-tighter uppercase select-none cursor-pointer"
        href="#hero"
      >
        Ember & Grain
      </a>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 items-center">
        <a
          className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-label-caps uppercase cursor-pointer"
          href="#menu"
        >
          Menu
        </a>
        <a
          className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-label-caps uppercase cursor-pointer"
          href="#story"
        >
          Experience
        </a>
        <a
          className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-label-caps uppercase cursor-pointer"
          href="#story"
        >
          Chef
        </a>
        <a
          className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-label-caps uppercase cursor-pointer"
          href="#gallery"
        >
          Gallery
        </a>
      </div>

      {/* Actions (Reservation CTA and Mobile Hamburger) */}
      <div className="flex items-center gap-4">
        <button
          className="bg-primary text-on-primary font-label-caps text-label-caps uppercase px-6 py-3 hover:opacity-80 transition-opacity cursor-pointer btn-sharp"
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

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-surface-container-low/95 backdrop-blur-lg border-b border-outline-variant/20 flex flex-col px-margin-mobile py-6 gap-4 md:hidden z-40">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-label-caps uppercase py-3 border-b border-outline-variant/10 cursor-pointer"
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            Menu
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-label-caps uppercase py-3 border-b border-outline-variant/10 cursor-pointer"
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
          >
            Experience
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-label-caps uppercase py-3 border-b border-outline-variant/10 cursor-pointer"
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
          >
            Chef
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-label-caps uppercase py-3 cursor-pointer"
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
          >
            Gallery
          </a>
        </div>
      )}
    </nav>
  );
}
