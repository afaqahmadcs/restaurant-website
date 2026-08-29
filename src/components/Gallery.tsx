"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  label: string;
  colSpan: string;
  heightClass: string;
  offsetClass: string;
  parallaxSpeed: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    image: "/assets/restaurant-interior.png",
    alt: "Ember & Grain Restaurant Lounge Room",
    label: "The Dining Room",
    colSpan: "md:col-span-7",
    heightClass: "h-[450px] md:h-[500px]",
    offsetClass: "md:translate-y-0",
    parallaxSpeed: -6
  },
  {
    id: "gal-2",
    image: "/assets/kitchen-action.png",
    alt: "Open wood fire hearth details",
    label: "The Hearth",
    colSpan: "md:col-span-5",
    heightClass: "h-[350px] md:h-[400px]",
    offsetClass: "md:translate-y-20", // offset translate Y
    parallaxSpeed: 8
  },
  {
    id: "gal-3",
    image: "/assets/chef-sterling.png",
    alt: "Chef Elias Sterling inspecting ingredients",
    label: "The Craft",
    colSpan: "md:col-span-4",
    heightClass: "h-[400px] md:h-[450px]",
    offsetClass: "md:-translate-y-12", // offset translate Y
    parallaxSpeed: -10
  },
  {
    id: "gal-4",
    image: "/assets/customers-dining.png",
    alt: "Guests enjoying dining experience",
    label: "The Salon",
    colSpan: "md:col-span-8",
    heightClass: "h-[400px] md:h-[450px]",
    offsetClass: "md:translate-y-4",
    parallaxSpeed: 5
  },
  {
    id: "gal-5",
    image: "/assets/wagyu-burger.png",
    alt: "Gourmet signature wagyu beef burger plated",
    label: "The Masterpiece",
    colSpan: "md:col-span-12",
    heightClass: "h-[500px] md:h-[600px]",
    offsetClass: "md:mt-16",
    parallaxSpeed: -4
  }
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    // Check prefers-reduced-motion media query
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(".reveal-overlay", { scaleX: 0 });
      gsap.set(".gallery-img", { scale: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop Scrolling Animations
    mm.add("(min-width: 768px)", () => {
      const items = gsap.utils.toArray(".gallery-item-wrapper");

      items.forEach((item: any) => {
        const overlay = item.querySelector(".reveal-overlay");
        const image = item.querySelector(".gallery-img");
        const speed = parseFloat(item.getAttribute("data-speed") || "0");

        // 1. Cinematic slide-away mask reveal
        gsap.to(overlay, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });

        // 2. Parallax scaling image scroll hook
        gsap.fromTo(
          image,
          { scale: 1.15, yPercent: speed * -1.5 },
          {
            scale: 1.0,
            yPercent: speed * 1.5,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });
    });

    // Mobile Animations
    mm.add("(max-width: 767px)", () => {
      const items = gsap.utils.toArray(".gallery-item-wrapper");

      items.forEach((item: any) => {
        const overlay = item.querySelector(".reveal-overlay");
        const image = item.querySelector(".gallery-img");

        // Simple quick fade reveal on mobile touch viewport
        gsap.to(overlay, {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        });

        gsap.set(image, { scale: 1.0, yPercent: 0 });
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="section-padding bg-surface-container-lowest overflow-hidden" id="gallery">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Editorial Header */}
        <div className="text-center mb-28">
          <span className="label-caps text-primary tracking-widest block mb-4">
            Atmosphere
          </span>
          <h2 className="headline-md text-on-surface">The Gallery</h2>
          <p className="body-md text-on-surface-variant max-w-md mx-auto pt-2 leading-relaxed">
            Visual dispatches from our open hearth, curing cellars, and the dining room table.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 items-start">
          {GALLERY_ITEMS.map(item => (
            <div
              key={item.id}
              className={`${item.colSpan} ${item.heightClass} ${item.offsetClass} border border-outline-variant/30 p-2 bg-surface-container-low gallery-item-wrapper`}
              data-speed={item.parallaxSpeed}
            >
              <div className="w-full h-full overflow-hidden reveal-wrapper relative group cursor-pointer select-none">
                
                {/* Visual slide cover mask */}
                <div className="reveal-overlay absolute inset-0 bg-surface-container-lowest z-10" />

                {/* Main high-res visual */}
                <div className="w-full h-full relative gallery-img">
                  <Image
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1200ms] ease-out"
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Visual Description overlay with gold line border */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20 pointer-events-none">
                  <span className="label-caps text-primary border border-primary px-8 py-3 tracking-widest uppercase transition-transform duration-500 scale-95 group-hover:scale-100">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
