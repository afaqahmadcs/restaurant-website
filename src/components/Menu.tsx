"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "burgers" | "sides" | "drinks" | "desserts";
  image: string;
  ingredients: string;
  tags: string[];
  dietary?: ("V" | "VEGAN" | "GF" | "GF OPTION")[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "item-1",
    name: "The Wagyu Signature",
    price: 32,
    description: "8oz dry-aged Wagyu beef patty, caramelized onion jam, truffle aioli, aged gruyère, butter-lettuce, artisan brioche. Served medium rare.",
    ingredients: "A5 Japanese Wagyu, Cave-Aged Gruyère, Truffle Aioli, Fermented Brioche Bun, Oak-Charred Onions",
    category: "burgers",
    image: "/assets/wagyu-burger.png",
    tags: ["Wagyu A5", "Signature"],
    dietary: ["GF OPTION"]
  },
  {
    id: "item-2",
    name: "Smoked Brisket Smash",
    price: 28,
    description: "Double dry-aged beef patties, house-smoked brisket, bourbon BBQ glaze, crispy shallots, smoked gouda.",
    ingredients: "Dry-Aged Angus Beef, House Oak-Smoked Brisket, Bourbon BBQ Glaze, Smoked Gouda, Shallots",
    category: "burgers",
    image: "/assets/raw-patty.png",
    tags: ["Oak Smoked"]
  },
  {
    id: "item-3",
    name: "Truffle Pommes Frites",
    price: 14,
    description: "Hand-cut russet potatoes, white truffle oil, parmigiano-reggiano, fresh parsley, roasted garlic aioli.",
    ingredients: "Russet Potatoes, Italian White Truffle Oil, Aged Parmigiano-Reggiano, Roast Garlic Aoili",
    category: "sides",
    image: "/assets/heirloom-tomatoes.png",
    tags: ["Signature"],
    dietary: ["V", "GF"]
  },
  {
    id: "item-4",
    name: "Charred Broccolini",
    price: 16,
    description: "Wood-fired broccolini, toasted marcona almonds, chili flakes, preserved lemon vinaigrette.",
    ingredients: "Organic Broccolini, Toasted Marcona Almonds, Chili Flakes, Preserved Lemon Vinaigrette",
    category: "sides",
    image: "/assets/kitchen-action.png",
    tags: ["Wood fired"],
    dietary: ["VEGAN", "GF"]
  },
  {
    id: "item-5",
    name: "Smoked Old Fashioned",
    price: 22,
    description: "Single barrel bourbon, demerara, aromatic bitters, smoked in glass with hickory wood chips.",
    ingredients: "Single Barrel Bourbon Whiskey, Demerara Sugar Syrup, Aromatic Bitters, Oak-Fired Hickory Smoke",
    category: "drinks",
    image: "/assets/customers-dining.png",
    tags: ["Craft Cocktail"]
  },
  {
    id: "item-6",
    name: "Charred Fig Cake",
    price: 18,
    description: "Wood-charred black mission figs, wild clover honey cake, fresh mascarpone whipped cream.",
    ingredients: "Black Mission Figs, Wild Clover Honey, Mascarpone Whipped Cream",
    category: "desserts",
    image: "/assets/restaurant-interior.png",
    tags: ["Wood charred"],
    dietary: ["V"]
  }
];

interface MenuProps {
  onOpenReservations: () => void;
}

export default function Menu({ onOpenReservations }: MenuProps) {
  const [activeFilter, setActiveFilter] = useState<"burgers" | "sides" | "drinks" | "desserts">("burgers");
  const [hoveredItem, setHoveredItem] = useState<MenuItem>(MENU_ITEMS[0]);
  const menuListRef = useRef<HTMLDivElement | null>(null);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeFilter);

  // Set default hovered item when category switches
  useEffect(() => {
    if (filteredItems.length > 0) {
      setHoveredItem(filteredItems[0]);
    }
  }, [activeFilter]);

  // GSAP animation for item stagger transitions when active category changes
  useGSAP(() => {
    if (menuListRef.current) {
      gsap.fromTo(
        menuListRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          overwrite: "auto"
        }
      );
    }
  }, [activeFilter]);

  const categories: { key: "burgers" | "sides" | "drinks" | "desserts"; label: string }[] = [
    { key: "burgers", label: "Burgers" },
    { key: "sides", label: "Sides" },
    { key: "drinks", label: "Drinks" },
    { key: "desserts", label: "Desserts" }
  ];

  return (
    <section className="section-padding bg-background border-y border-outline-variant/20 overflow-hidden" id="menu">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Editorial Header */}
        <div className="text-center mb-24">
          <span className="label-caps text-primary tracking-widest block mb-4">
            Curated Selections
          </span>
          <h2 className="headline-md text-on-surface">The Dining Menu</h2>
          <p className="body-md text-on-surface-variant max-w-md mx-auto pt-2 leading-relaxed">
            An elemental exploration of wood-fired smoke, prime cuts, and absolute culinary restraint.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Sticky Tabs & Dynamic Visual Frame (Desktop only) */}
          <div className="hidden lg:block lg:col-span-5 lg:sticky lg:top-32 space-y-12">
            
            {/* Category Navigation Tabs */}
            <div className="flex flex-col border-l border-outline-variant/30 pl-8 space-y-6">
              {categories.map(cat => (
                <button
                  key={cat.key}
                  className={`text-left font-label-caps text-xs tracking-widest uppercase transition-all duration-300 relative py-1 cursor-pointer ${
                    activeFilter === cat.key
                      ? "text-primary font-bold pl-4"
                      : "text-on-surface-variant hover:text-on-surface hover:pl-2"
                  }`}
                  onClick={() => setActiveFilter(cat.key)}
                >
                  {/* Indicator Line */}
                  {activeFilter === cat.key && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-primary" />
                  )}
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Immersive Photo Frame */}
            <div className="relative aspect-[4/5] w-full border border-outline-variant/20 overflow-hidden group">
              <Image
                key={hoveredItem.id}
                src={hoveredItem.image}
                alt={hoveredItem.name}
                fill
                sizes="35vw"
                className="object-cover brightness-90 transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              {/* Subtle Vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Mobile Category Navigation (Horizontal scrollable tabs) */}
          <div className="lg:hidden flex overflow-x-auto no-scrollbar border-b border-outline-variant/20 pb-4 mb-8 gap-8 select-none">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`whitespace-nowrap font-label-caps text-xs tracking-widest pb-2 uppercase border-b-2 transition-all cursor-pointer ${
                  activeFilter === cat.key
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-on-surface-variant hover:text-on-surface"
                }`}
                onClick={() => setActiveFilter(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Right Column: Menu Items List */}
          <div ref={menuListRef} className="lg:col-span-7 flex flex-col divide-y divide-outline-variant/20">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className={`py-8 first:pt-0 group transition-all duration-300 ${
                  hoveredItem.id === item.id ? "border-l-0 lg:border-l-2 lg:border-primary lg:pl-6" : "lg:pl-0"
                }`}
                onMouseEnter={() => setHoveredItem(item)}
              >
                {/* Mobile Image Display (inline, hidden on desktop) */}
                <div className="lg:hidden w-full aspect-[16/10] relative mb-6 border border-outline-variant/20 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="100vw"
                    className="object-cover brightness-95"
                  />
                </div>

                {/* Headings */}
                <div className="flex justify-between items-baseline mb-4">
                  <h3 className="font-serif text-2xl font-bold text-white transition-colors duration-300 group-hover:text-primary">
                    {item.name}
                  </h3>
                  <span className="font-serif text-xl text-primary font-bold pl-4">
                    ${item.price}
                  </span>
                </div>

                {/* Description */}
                <p className="body-md text-on-surface-variant text-sm mb-4 leading-relaxed max-w-2xl">
                  {item.description}
                </p>

                {/* Ingredients tag list */}
                <div className="mb-6">
                  <p className="font-sans text-[10px] uppercase tracking-wider text-on-surface/50">
                    <span className="text-primary/70 font-bold">Construct: </span>
                    {item.ingredients}
                  </p>
                </div>

                {/* Bottom Row: Tags & CTA */}
                <div className="flex justify-between items-center flex-wrap gap-4 pt-2">
                  <div className="flex gap-2 flex-wrap">
                    {item.tags.map(tag => (
                      <span key={tag} className="chip chip-gold text-[9px] tracking-wider py-0.5 px-2">
                        {tag}
                      </span>
                    ))}
                    {item.dietary?.map(diet => (
                      <span key={diet} className="chip border-secondary/40 text-secondary text-[9px] tracking-wider py-0.5 px-2">
                        {diet}
                      </span>
                    ))}
                  </div>

                  <button
                    className="text-primary font-bold hover:text-white transition-all label-caps text-xs uppercase cursor-pointer border-b border-transparent hover:border-white pb-0.5 ml-auto"
                    onClick={onOpenReservations}
                  >
                    Reserve Table
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
