import React from "react";
import Image from "next/image";

export default function Visit() {
  return (
    <section className="section-padding bg-surface-container-low border-t border-outline-variant/20" id="visit">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid-12 gap-12 items-stretch">
          
          {/* Left Panel: Hours & Contact */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="label-caps text-primary tracking-widest block">
                Find Us
              </span>
              <h2 className="headline-md text-on-surface">Secure Your Table</h2>
              <p className="body-lg text-on-surface-variant max-w-md">
                Experience the culmination of fire and culinary craft. Walk-ins are subject to grill capacity; reservations are highly encouraged.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-outline-variant/30 pt-12 mt-12">
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
                  <p>
                    1284 Ember Lane,
                    <br />
                    Metropolis, NY 10012
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
          <div className="md:col-span-5 relative mt-12 md:mt-0 flex flex-col justify-center min-h-[350px]">
            <div className="w-full h-full min-h-[350px] bg-surface-container-high border border-outline-variant/40 relative overflow-hidden group">
              
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
                <div className="flex items-center gap-4 bg-surface-container-low/90 backdrop-blur-md p-4 border border-outline-variant/40 w-fit self-center mt-12 relative">
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
              <div className="absolute inset-0 border-l border-r border-t border-b border-outline-variant/20 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
