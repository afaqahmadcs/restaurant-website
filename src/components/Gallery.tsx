import React from "react";
import Image from "next/image";

interface GalleryItem {
  id: string;
  image: string;
  alt: string;
  label: string;
  colSpan: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    image: "/assets/restaurant-interior.png",
    alt: "Ember & Grain Restaurant Lounge Room",
    label: "The Dining Room",
    colSpan: "md:col-span-8"
  },
  {
    id: "gal-2",
    image: "/assets/kitchen-action.png",
    alt: "Open wood fire hearth details",
    label: "The Hearth",
    colSpan: "md:col-span-4"
  },
  {
    id: "gal-3",
    image: "/assets/customers-dining.png",
    alt: "Guests enjoying dining experience",
    label: "The Salon",
    colSpan: "md:col-span-4"
  },
  {
    id: "gal-4",
    image: "/assets/raw-patty.png",
    alt: "Raw wagyu burger ingredients close details",
    label: "The Ingredients",
    colSpan: "md:col-span-8"
  }
];

export default function Gallery() {
  return (
    <section className="section-padding bg-surface-container-lowest" id="gallery">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header */}
        <div className="text-center mb-24">
          <span className="label-caps text-primary tracking-widest block mb-4">
            Atmosphere
          </span>
          <h2 className="headline-md text-on-surface">The Gallery</h2>
        </div>

        {/* Grid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {GALLERY_ITEMS.map(item => (
            <div
              key={item.id}
              className={`${item.colSpan} h-[400px] border border-outline-variant p-2 bg-surface-container-low`}
            >
              <div className="w-full h-full overflow-hidden parallax-wrapper relative group cursor-pointer select-none">
                <Image
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Visual Description overlay */}
                <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="label-caps text-white border border-white px-6 py-2">
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
