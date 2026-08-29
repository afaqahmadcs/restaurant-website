"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Story() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Section Refs
  const philosophyTextRef = useRef<HTMLDivElement | null>(null);
  const philosophyImageRef = useRef<HTMLImageElement | null>(null);
  
  const chefBgRef = useRef<HTMLImageElement | null>(null);
  const chefTextRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    // Check prefers-reduced-motion media query
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(".animate-fade-up, .pillar-card", { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop Animations
    mm.add("(min-width: 768px)", () => {
      // 1. Philosophy section: Text fades up on entering screen
      gsap.fromTo(
        philosophyTextRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: philosophyTextRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Parallax movement on the raw wagyu patty image
      gsap.fromTo(
        philosophyImageRef.current,
        { scale: 1.15, yPercent: -8 },
        {
          scale: 1.0,
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: philosophyImageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // 2. Chef's quote background parallax zoom
      gsap.fromTo(
        chefBgRef.current,
        { scale: 1.25, yPercent: -12 },
        {
          scale: 1.02,
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: "#chef-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // Chef's quote fade up stagger
      if (chefTextRef.current) {
        gsap.fromTo(
          chefTextRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chefTextRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // 3. Three pillars grid card staggers
      gsap.fromTo(
        ".pillar-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".pillars-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });

    // Mobile Animations
    mm.add("(max-width: 767px)", () => {
      // Light entrance transitions without heavy scrub parallax
      gsap.fromTo(
        [philosophyTextRef.current, philosophyImageRef.current?.parentElement],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: philosophyTextRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );

      if (chefTextRef.current) {
        gsap.fromTo(
          chefTextRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: chefTextRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      gsap.fromTo(
        ".pillar-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pillars-container",
            start: "top 85%",
            toggleActions: "play none none reverse",
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div id="story" ref={containerRef}>
      {/* 1. Philosophy Section */}
      <section className="section-padding px-margin-mobile md:px-margin-desktop bg-surface-container-low overflow-hidden">
        <div className="max-w-container-max mx-auto">
          <div className="grid-12 items-center gap-16">
            {/* Left Narrative */}
            <div ref={philosophyTextRef} className="md:col-span-5 md:col-start-1 space-y-8 animate-fade-up">
              <span className="label-caps text-primary tracking-widest block">
                Our Philosophy
              </span>
              <h2 className="headline-md text-on-background">
                Provenance & Fire.
              </h2>
              <div className="space-y-6 body-md text-on-surface-variant leading-relaxed">
                <p>
                  We believe that true luxury lies in restraint. Sourcing only the
                  finest heritage breeds and organic produce, we allow the
                  intrinsic profiles of our ingredients to speak for themselves.
                </p>
                <p>
                  Every element is touched by fire—from the wood-fired grill that
                  sears our custom A5 wagyu blend to the charred edges of our
                  hearth-baked brioche. It is an elemental approach to dining,
                  sophisticated yet uncompromisingly primal.
                </p>
              </div>
            </div>

            {/* Right Image Frame */}
            <div className="md:col-span-6 md:col-start-7 relative h-[450px] md:h-[550px] w-full">
              <div className="absolute inset-0 border border-surface-variant -translate-x-4 translate-y-4 -z-10 animate-fade-up" />
              <div className="w-full h-full overflow-hidden parallax-wrapper border border-outline-variant/30 relative">
                <Image
                  ref={philosophyImageRef}
                  className="object-cover brightness-90"
                  src="/assets/raw-patty.png"
                  alt="Raw Wagyu Patty on searing hot cast iron"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Chef's Vision quote break */}
      <section id="chef-section" className="relative w-full min-h-[75vh] flex items-center bg-surface-container-lowest overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            ref={chefBgRef}
            className="object-cover brightness-40 opacity-70 filter contrast-125"
            src="/assets/chef-sterling.png"
            alt="Executive Chef Elias Sterling in modern kitchen"
            fill
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24">
          <div ref={chefTextRef} className="max-w-2xl space-y-8 animate-fade-up">
            <span className="material-symbols-outlined text-primary text-6xl opacity-50 block select-none">
              format_quote
            </span>
            <blockquote className="headline-sm md:headline-md text-on-surface italic leading-snug">
              "A great burger is not fast food. It is an exercise in restraint,
              technique, and quality."
            </blockquote>
            <div className="h-[1px] w-24 bg-primary-container" />
            <div>
              <p className="label-caps text-primary tracking-widest mb-1">
                Executive Chef
              </p>
              <p className="font-serif text-xl font-bold">Elias Sterling</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Brand Pillars Grid */}
      <section className="section-padding bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-24">
            <span className="label-caps text-primary tracking-widest block mb-4">
              Our Foundation
            </span>
            <h2 className="headline-sm text-on-surface">The Three Pillars</h2>
          </div>

          <div className="pillars-container grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {/* Quality */}
            <div className="pillar-card flex flex-col gap-6 border-t border-outline-variant/30 pt-8">
              <span className="display-lg-mobile text-primary/50 tracking-tighter">
                01
              </span>
              <h3 className="headline-sm text-on-surface text-2xl">
                Uncompromising Quality
              </h3>
              <p className="body-md text-on-surface-variant">
                Sourcing exclusive wagyu genetics and organic garden produce. No
                compromises, only exceptional raw ingredients.
              </p>
            </div>
            {/* Provenance */}
            <div className="pillar-card flex flex-col gap-6 border-t border-outline-variant/30 pt-8">
              <span className="display-lg-mobile text-primary/50 tracking-tighter">
                02
              </span>
              <h3 className="headline-sm text-on-surface text-2xl">
                Verified Provenance
              </h3>
              <p className="body-md text-on-surface-variant">
                Tracking the origin of every ingredient. We partner with local
                farming families who share our dedication to ethical craft.
              </p>
            </div>
            {/* Mastery */}
            <div className="pillar-card flex flex-col gap-6 border-t border-outline-variant/30 pt-8">
              <span className="display-lg-mobile text-primary/50 tracking-tighter">
                03
              </span>
              <h3 className="headline-sm text-on-surface text-2xl">
                Culinary Mastery
              </h3>
              <p className="body-md text-on-surface-variant">
                The strict application of heat and timing. From wood-fired
                charring to exact resting times, every step is deliberate.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
