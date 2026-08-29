"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface VisitProps {
  onOpenReservations: () => void;
}

export default function Visit({ onOpenReservations }: VisitProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Refs for animations
  const mapOverlayRef = useRef<HTMLDivElement | null>(null);
  const finalCtaBgRef = useRef<HTMLImageElement | null>(null);
  const finalCtaTextRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    // Check prefers-reduced-motion media query
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(".animate-reveal", { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop Scroll-driven transitions
    mm.add("(min-width: 768px)", () => {
      // 1. Map locator tag zoom/ping reveal
      gsap.fromTo(
        mapOverlayRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: mapOverlayRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // 2. Final Cinematic CTA background parallax scale
      gsap.fromTo(
        finalCtaBgRef.current,
        { scale: 1.2, yPercent: -10 },
        {
          scale: 1.02,
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: "#final-cta-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // Final CTA text staggers
      if (finalCtaTextRef.current) {
        gsap.fromTo(
          finalCtaTextRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            stagger: 0.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: finalCtaTextRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    });

    // Mobile simpler entrance transitions
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        mapOverlayRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          scrollTrigger: {
            trigger: mapOverlayRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      if (finalCtaTextRef.current) {
        gsap.fromTo(
          finalCtaTextRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: finalCtaTextRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    });
  }, { scope: containerRef });

  const handleOrderOnline = () => {
    alert("Ordering online feature coming soon. Please book a table experience to dine in!");
  };

  return (
    <div ref={containerRef}>
      {/* 1. Visit Us / Location */}
      <section className="section-padding bg-surface-container-low border-t border-outline-variant/20 overflow-hidden" id="visit">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
            
            {/* Left Panel: Hours, Contact & Primary CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
              <div className="space-y-6">
                <span className="label-caps text-primary tracking-widest block">
                  Find Us
                </span>
                <h2 className="headline-md text-on-surface">Secure Your Table</h2>
                <p className="body-lg text-on-surface-variant max-w-md leading-relaxed">
                  Experience the culmination of wood fire and culinary craft. Walk-ins are subject to grill capacity; reservations are highly encouraged.
                </p>
                
                {/* Active conversion buttons directly in grid panel */}
                <div className="flex flex-col sm:flex-row gap-6 pt-4">
                  <button
                    className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 uppercase tracking-widest hover:bg-[#ffe088] transition-colors duration-300 cursor-pointer btn-sharp"
                    onClick={onOpenReservations}
                  >
                    Reserve Table
                  </button>
                  <button
                    className="border border-outline text-on-background font-label-caps text-label-caps px-8 py-4 uppercase tracking-widest hover:border-primary hover:text-primary transition-colors duration-300 cursor-pointer btn-sharp"
                    onClick={handleOrderOnline}
                  >
                    Order Online
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-outline-variant/30 pt-12">
                {/* Operational Hours */}
                <div>
                  <h3 className="label-caps text-primary tracking-wider mb-6">
                    Hours of Operation
                  </h3>
                  <ul className="space-y-4 body-md text-on-surface-variant">
                    <li className="flex justify-between border-b border-surface-variant/40 pb-2">
                      <span>Mon - Thu</span>
                      <span className="font-bold text-white">5:00 PM - 10:00 PM</span>
                    </li>
                    <li className="flex justify-between border-b border-surface-variant/40 pb-2">
                      <span>Fri - Sat</span>
                      <span className="font-bold text-white">5:00 PM - 11:30 PM</span>
                    </li>
                    <li className="flex justify-between border-b border-surface-variant/40 pb-2">
                      <span>Sunday</span>
                      <span className="font-bold text-white">4:00 PM - 9:00 PM</span>
                    </li>
                  </ul>
                </div>
                
                {/* Contact Information */}
                <div>
                  <h3 className="label-caps text-primary tracking-wider mb-6">
                    Contact & Inquiries
                  </h3>
                  <div className="space-y-4 body-md text-on-surface-variant">
                    <p className="leading-relaxed">
                      1284 Ember Lane,
                      <br />
                      Meatpacking District, NY 10012
                    </p>
                    <div className="pt-4 space-y-2">
                      <a
                        className="block text-white hover:text-primary transition-colors font-bold"
                        href="tel:+12125550198"
                      >
                        +1 (212) 555-0198
                      </a>
                      <a
                        className="block text-white hover:text-primary transition-colors"
                        href="mailto:reservations@emberandgrain.com"
                      >
                        reservations@emberandgrain.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Stylized Map Card */}
            <div className="lg:col-span-5 relative flex flex-col justify-center min-h-[400px]">
              <div className="w-full h-full min-h-[400px] bg-surface-container-high border border-outline-variant/40 relative overflow-hidden group">
                
                {/* Simulated Map Grid Background */}
                <div className="absolute inset-0 grayscale mix-blend-luminosity opacity-40 group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-700 pointer-events-none">
                  <Image
                    src="/assets/restaurant-interior.png"
                    alt="Background Map Grid visual"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-background/80 mix-blend-multiply pointer-events-none" />
                
                {/* Overlay Vectors & Locator Info */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  {/* Visual locator tag */}
                  <div
                    ref={mapOverlayRef}
                    className="flex items-center gap-4 bg-surface-container-low/95 backdrop-blur-md p-4 border border-outline-variant/40 w-fit self-center mt-16 relative"
                  >
                    <span className="material-symbols-outlined text-primary text-3xl animate-ping absolute">
                      location_on
                    </span>
                    <span className="material-symbols-outlined text-primary text-3xl relative">
                      location_on
                    </span>
                    <div>
                      <p className="font-bold text-xs uppercase tracking-wider text-white">
                        Ember & Grain
                      </p>
                      <p className="text-[10px] text-on-surface-variant uppercase">
                        Meatpacking District
                      </p>
                    </div>
                  </div>
                  
                  <a
                    className="body-md text-sm text-primary hover:text-white transition-colors flex items-center gap-2 font-bold cursor-pointer select-none"
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="material-symbols-outlined text-lg">directions</span>
                    Get Directions
                  </a>
                </div>
                
                {/* Clean decorative brutalist frame lines */}
                <div className="absolute inset-0 border border-outline-variant/10 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Final Cinematic CTA (Visual Conclusion) */}
      <section
        id="final-cta-section"
        className="relative w-full min-h-[80vh] flex items-center justify-center bg-surface-container-lowest overflow-hidden border-t border-outline-variant/20"
      >
        {/* Parallax Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            ref={finalCtaBgRef}
            src="/assets/customers-dining.png"
            alt="Ember & Grain moody dining atmosphere background"
            fill
            sizes="100vw"
            className="object-cover brightness-30 contrast-110 filter saturate-75"
          />
          {/* Subtle gold center spotlight vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/40 to-background pointer-events-none" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24 text-center">
          <div ref={finalCtaTextRef} className="max-w-3xl mx-auto space-y-10">
            <span className="label-caps text-primary tracking-widest block">
              The Experience
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white uppercase tracking-tighter leading-none">
              CRAFTED FOR THE
              <br />
              <span className="text-primary italic font-light font-headline-md md:font-display-lg block mt-2">
                DISCERNING
              </span>
            </h2>
            <p className="body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              We invite you to sit by the embers. Discover the absolute precision of culinary restraint, seared over wood-fired flames.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6">
              <button
                className="bg-primary text-on-primary font-label-caps text-label-caps px-10 py-4 uppercase tracking-widest hover:bg-[#ffe088] transition-colors duration-300 cursor-pointer btn-sharp w-full sm:w-auto"
                onClick={onOpenReservations}
              >
                Book an Experience
              </button>
              <button
                className="border border-outline text-on-background font-label-caps text-label-caps px-10 py-4 uppercase tracking-widest hover:border-primary hover:text-primary transition-colors duration-300 cursor-pointer btn-sharp w-full sm:w-auto"
                onClick={handleOrderOnline}
              >
                Order Signature
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
