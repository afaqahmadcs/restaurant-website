"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BurgerCanvas from "./BurgerCanvas";

export default function Anatomy() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<number>(0);
  const [webglAvailable, setWebglAvailable] = useState(true);

  // Fallback Image Refs
  const crownRef = useRef<HTMLImageElement | null>(null);
  const tomatoRef = useRef<HTMLImageElement | null>(null);
  const cheeseRef = useRef<HTMLImageElement | null>(null);
  const pattyRef = useRef<HTMLImageElement | null>(null);
  const heelRef = useRef<HTMLImageElement | null>(null);

  // Text List Item Refs
  const item1Ref = useRef<HTMLDivElement | null>(null);
  const item2Ref = useRef<HTMLDivElement | null>(null);
  const item3Ref = useRef<HTMLDivElement | null>(null);
  const item4Ref = useRef<HTMLDivElement | null>(null);

  // Detect WebGL availability on mount
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const support = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setWebglAvailable(support);
    } catch (e) {
      setWebglAvailable(false);
    }
  }, []);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      // Keep slices exploded slightly for static readability, don't pin
      if (!webglAvailable) {
        gsap.set(crownRef.current, { y: -50 });
        gsap.set(tomatoRef.current, { y: -20 });
        gsap.set(cheeseRef.current, { y: 10 });
        gsap.set(pattyRef.current, { y: 40 });
        gsap.set(heelRef.current, { y: 70 });
      } else {
        progressRef.current = 0.3; // slightly open
      }
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop Scrolling Pin Experience
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=180%",
          scrub: 1.2,
          pin: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          }
        }
      });

      // If WebGL fallback is active, animate the sliced flat images
      if (!webglAvailable) {
        tl.to(crownRef.current, { y: -210, rotation: -4, scale: 1.05, ease: "none" }, 0)
          .to(tomatoRef.current, { y: -100, rotation: 3, scale: 1.02, ease: "none" }, 0)
          .to(cheeseRef.current, { y: 0, rotation: -2, ease: "none" }, 0)
          .to(pattyRef.current, { y: 100, rotation: 2, scale: 1.02, ease: "none" }, 0)
          .to(heelRef.current, { y: 210, rotation: -3, scale: 1.05, ease: "none" }, 0);
      }

      // Staggered list highlighting on the left
      tl.fromTo(item1Ref.current, { opacity: 1, scale: 1 }, { opacity: 0.15, scale: 0.95, duration: 0.2 }, 0.15)
        
        .fromTo(item2Ref.current, { opacity: 0.15, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.2 }, 0.25)
        .to(item2Ref.current, { opacity: 0.15, scale: 0.95, duration: 0.2 }, 0.45)
        
        .fromTo(item3Ref.current, { opacity: 0.15, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.2 }, 0.55)
        .to(item3Ref.current, { opacity: 0.15, scale: 0.95, duration: 0.2 }, 0.75)
        
        .fromTo(item4Ref.current, { opacity: 0.15, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.2 }, 0.85);
    });

    // Mobile Scrolling linear reveals
    mm.add("(max-width: 767px)", () => {
      const items = gsap.utils.toArray(".mobile-anatomy-item");
      items.forEach((item: any) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    });
  }, { scope: containerRef, dependencies: [webglAvailable] });

  return (
    <section ref={containerRef} className="anatomy-container relative w-full" id="anatomy">
      {/* Desktop Layout (Split Sticky Anatomy) */}
      <div className="hidden md:block">
        <div className="anatomy-sticky-section min-h-screen w-full flex items-center">
          <div className="anatomy-grid w-full">
            {/* Left Side: Explaining Text Layers */}
            <div className="anatomy-texts">
              <div className="space-y-12">
                <div>
                  <span className="label-caps text-primary tracking-widest mb-4 block">
                    The Construct
                  </span>
                  <h2 className="headline-md text-on-surface mb-6">
                    EVERY LAYER
                    <br />
                    MATTERS.
                  </h2>
                  <p className="body-md text-on-surface-variant max-w-sm leading-relaxed">
                    Our Signature Wagyu Burger is not merely assembled; it is
                    orchestrated. Sourced with uncompromising intention.
                  </p>
                </div>

                <div className="space-y-8 border-t border-outline-variant/30 pt-8 max-w-sm relative">
                  {/* Layer 1 */}
                  <div ref={item1Ref} className="transition-all duration-300 origin-left">
                    <h3 className="label-caps text-primary tracking-widest mb-2">
                      01 / The Crown
                    </h3>
                    <h4 className="font-serif text-lg font-bold text-white mb-2">
                      Hearth-Baked Brioche
                    </h4>
                    <p className="body-md text-xs text-on-surface-variant leading-relaxed">
                      Slow-fermented for 48 hours and toasted over oak embers.
                      Delivers buttery softness.
                    </p>
                  </div>
                  {/* Layer 2 */}
                  <div ref={item2Ref} className="opacity-15 scale-95 transition-all duration-300 origin-left">
                    <h3 className="label-caps text-primary tracking-widest mb-2">
                      02 / The Acidity
                    </h3>
                    <h4 className="font-serif text-lg font-bold text-white mb-2">
                      Vine-Ripened Tomatoes
                    </h4>
                    <p className="body-md text-xs text-on-surface-variant leading-relaxed">
                      Thick-cut heirloom tomatoes seasoned with sea salt to slice through wagyu marbling.
                    </p>
                  </div>
                  {/* Layer 3 */}
                  <div ref={item3Ref} className="opacity-15 scale-95 transition-all duration-300 origin-left">
                    <h3 className="label-caps text-primary tracking-widest mb-2">
                      03 / The Bind
                    </h3>
                    <h4 className="font-serif text-lg font-bold text-white mb-2">
                      Truffle Cave Cheddar
                    </h4>
                    <p className="body-md text-xs text-on-surface-variant leading-relaxed">
                      Aged 24 months, infused with black truffles and melted to draping viscosity.
                    </p>
                  </div>
                  {/* Layer 4 */}
                  <div ref={item4Ref} className="opacity-15 scale-95 transition-all duration-300 origin-left">
                    <h3 className="label-caps text-primary tracking-widest mb-2">
                      04 / The Core
                    </h3>
                    <h4 className="font-serif text-lg font-bold text-white mb-2">
                      Hand-Pressed A5 Wagyu
                    </h4>
                    <p className="body-md text-xs text-on-surface-variant leading-relaxed">
                      Proprietary grind seared hard on plancha plan to form a deep caramelized crust.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Stacked slices OR 3D canvas */}
            <div className="anatomy-visual-container flex items-center justify-center overflow-hidden">
              {webglAvailable ? (
                <BurgerCanvas progressRef={progressRef} />
              ) : (
                <div className="relative w-[380px] h-[550px] flex items-center justify-center">
                  <Image
                    ref={crownRef}
                    src="/assets/wagyu-burger.png"
                    alt="Burger Crown slice"
                    width={380}
                    height={550}
                    className="burger-layer-slice"
                    style={{ clipPath: "inset(0% 0% 70% 0%)", transform: "translateY(0px)" }}
                  />
                  <Image
                    ref={tomatoRef}
                    src="/assets/wagyu-burger.png"
                    alt="Heirloom Tomato slice"
                    width={380}
                    height={550}
                    className="burger-layer-slice"
                    style={{ clipPath: "inset(28% 0% 55% 0%)", transform: "translateY(0px)" }}
                  />
                  <Image
                    ref={cheeseRef}
                    src="/assets/wagyu-burger.png"
                    alt="Truffle Cheddar slice"
                    width={380}
                    height={550}
                    className="burger-layer-slice"
                    style={{ clipPath: "inset(44% 0% 41% 0%)", transform: "translateY(0px)" }}
                  />
                  <Image
                    ref={pattyRef}
                    src="/assets/wagyu-burger.png"
                    alt="Wagyu Patty slice"
                    width={380}
                    height={550}
                    className="burger-layer-slice"
                    style={{ clipPath: "inset(55% 0% 20% 0%)", transform: "translateY(0px)" }}
                  />
                  <Image
                    ref={heelRef}
                    src="/assets/wagyu-burger.png"
                    alt="Burger Heel slice"
                    width={380}
                    height={550}
                    className="burger-layer-slice"
                    style={{ clipPath: "inset(76% 0% 0% 0%)", transform: "translateY(0px)" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (Scroll-down linear timeline) */}
      <div className="md:hidden section-padding px-margin-mobile bg-surface-container-lowest">
        <div className="text-center mb-16">
          <span className="label-caps text-primary tracking-widest mb-2 block">
            The Anatomy
          </span>
          <h2 className="headline-sm text-on-surface">Every Layer Matters</h2>
          <p className="body-md text-on-surface-variant max-w-sm mx-auto mt-4">
            A deconstructed journey through the ultimate artisanal burger experience.
          </p>
        </div>

        <div className="space-y-16 max-w-md mx-auto">
          {/* Layer 1 */}
          <div className="mobile-anatomy-item group border-b border-outline-variant/30 pb-8 space-y-4">
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-surface-container-low border border-surface-variant/40">
              <Image
                src="/assets/wagyu-burger.png"
                alt="Brioche Bun Crown"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover"
                style={{ clipPath: "inset(0% 0% 67% 0%)", transform: "scale(1.8) translateY(5%)" }}
              />
            </div>
            <div>
              <h3 className="label-caps text-primary mb-1">01 / The Crown</h3>
              <h4 className="font-serif text-xl font-bold text-white mb-2">
                Artisanal Brioche
              </h4>
              <p className="body-md text-sm text-on-surface-variant leading-relaxed">
                Baked fresh daily, enriched with cultured butter for a delicate,
                pillowy structure that yields perfectly.
              </p>
            </div>
          </div>

          {/* Layer 2 */}
          <div className="mobile-anatomy-item group border-b border-outline-variant/30 pb-8 space-y-4">
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-surface-container-low border border-surface-variant/40">
              <Image
                src="/assets/heirloom-tomatoes.png"
                alt="Heirloom Tomatoes Slices"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="label-caps text-primary mb-1">02 / The Acidity</h3>
              <h4 className="font-serif text-xl font-bold text-white mb-2">
                Heirloom Tomatoes
              </h4>
              <p className="body-md text-sm text-on-surface-variant leading-relaxed">
                Thick cut and seasoned with hand-harvested sea salt, cutting
                through rich marbling with clean botanical brightness.
              </p>
            </div>
          </div>

          {/* Layer 3 */}
          <div className="mobile-anatomy-item group border-b border-outline-variant/30 pb-8 space-y-4">
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-surface-container-low border border-surface-variant/40">
              <Image
                src="/assets/wagyu-burger.png"
                alt="Truffle Cheese bind"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover"
                style={{ clipPath: "inset(48% 0% 43% 0%)", transform: "scale(2.2) translateY(-2%)" }}
              />
            </div>
            <div>
              <h3 className="label-caps text-primary mb-1">03 / The Bind</h3>
              <h4 className="font-serif text-xl font-bold text-white mb-2">
                Truffle Cave Cheddar
              </h4>
              <p className="body-md text-sm text-on-surface-variant leading-relaxed">
                Cave-aged yellow cheddar cheese melted to precise viscosity,
                infused with winter black winter truffles.
              </p>
            </div>
          </div>

          {/* Layer 4 */}
          <div className="mobile-anatomy-item group border-b border-outline-variant/30 pb-8 space-y-4">
            <div className="aspect-[4/3] w-full relative overflow-hidden bg-surface-container-low border border-surface-variant/40">
              <Image
                src="/assets/raw-patty.png"
                alt="Sizzling Wagyu beef patty center"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="label-caps text-primary mb-1">04 / The Core</h3>
              <h4 className="font-serif text-xl font-bold text-white mb-2">
                Hand-Pressed A5 Wagyu
              </h4>
              <p className="body-md text-sm text-on-surface-variant leading-relaxed">
                A custom grind of dry-aged Wagyu beef, sear-crusted on a hot plancha
                to caramelize edges while maintaining a tender center.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
