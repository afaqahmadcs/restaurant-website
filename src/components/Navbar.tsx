"use client";

import React, { useState, useEffect } from "react";

interface NavbarProps {
  onOpenReservations: () => void;
}

export default function Navbar({ onOpenReservations }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-dim/95 border-b border-outline-variant/10 shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center w-full">
        <a
          className="font-serif text-2xl font-bold tracking-tighter text-primary select-none uppercase"
          href="#hero"
        >
          Ember & Grain
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-xs tracking-wider"
            href="#story"
          >
            Our Story
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-xs tracking-wider"
            href="#anatomy"
          >
            The Anatomy
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-xs tracking-wider"
            href="#menu"
          >
            Menu
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-xs tracking-wider"
            href="#gallery"
          >
            Gallery
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-label-caps text-xs tracking-wider"
            href="#visit"
          >
            Visit
          </a>
        </div>

        {/* Call to Actions */}
        <div className="flex items-center gap-4">
          <button
            className="btn-sharp btn-primary-ember px-6 py-3 text-xs tracking-widest uppercase font-bold cursor-pointer"
            onClick={onOpenReservations}
          >
            Reservations
          </button>
          <button
            className="md:hidden text-primary focus:outline-none cursor-pointer"
            aria-label="Toggle Mobile Menu"
            onClick={toggleMobileMenu}
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="w-full bg-surface-container-low border-b border-outline-variant/30 flex flex-col px-margin-mobile py-6 gap-4 md:hidden">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-sm tracking-wider py-2 border-b border-outline-variant/10"
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
          >
            Our Story
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-sm tracking-wider py-2 border-b border-outline-variant/10"
            href="#anatomy"
            onClick={() => setMobileMenuOpen(false)}
          >
            The Anatomy
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-sm tracking-wider py-2 border-b border-outline-variant/10"
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            Menu
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-sm tracking-wider py-2 border-b border-outline-variant/10"
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
          >
            Gallery
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-sm tracking-wider py-2"
            href="#visit"
            onClick={() => setMobileMenuOpen(false)}
          >
            Visit
          </a>
        </div>
      )}
    </nav>
  );
}
