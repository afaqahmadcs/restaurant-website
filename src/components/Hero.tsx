import React from "react";
import Image from "next/image";

interface HeroProps {
  onOpenReservations: () => void;
}

export default function Hero({ onOpenReservations }: HeroProps) {
  return (
    <section
      className="relative min-h-screen w-full flex flex-col justify-between pt-32 pb-16 overflow-hidden"
      id="hero"
    >
      {/* Background vignette & layout canvas placeholder */}
      <div id="webgl-background-placeholder" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface-dim/60 via-transparent to-background -z-10 pointer-events-none" />

      {/* Main typography content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-12 flex flex-col items-center justify-center flex-grow">
        <h1 className="display-lg-mobile md:display-lg text-on-background uppercase mb-6 tracking-tighter drop-shadow-2xl">
          The Art of the<br />
          <span className="text-primary italic font-light font-serif">Burger</span>
        </h1>
        <p className="body-lg text-on-surface-variant max-w-xl mx-auto mb-10">
          A modern reimagining of the classic steakhouse. Where elemental fire meets meticulous craft in a dark, luxury dining lounge.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
          <button
            className="btn btn-sharp btn-primary-ember cursor-pointer"
            onClick={onOpenReservations}
          >
            Book an Experience
          </button>
          <a className="btn btn-sharp btn-secondary-ghost" href="#menu">
            View Menu
          </a>
        </div>
      </div>

      {/* Hero Visual Burger Image */}
      <div
        className="relative z-20 w-full max-w-xl md:max-w-2xl mx-auto px-4 mt-auto animate-float flex justify-center translate-y-12"
        id="burger-hero-container"
      >
        <Image
          src="/assets/wagyu-burger.png"
          alt="Gourmet signature wagyu beef burger"
          width={680}
          height={680}
          priority
          className="w-full h-auto object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
        />
      </div>
    </section>
  );
}
