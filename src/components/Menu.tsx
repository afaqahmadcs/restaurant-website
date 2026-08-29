"use client";

import React, { useState } from "react";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "burgers" | "sides" | "drinks" | "desserts";
  image: string;
  tags: string[];
  dietary?: ("V" | "VEGAN" | "GF" | "GF OPTION")[];
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "item-1",
    name: "The Wagyu Signature",
    price: 32,
    description: "8oz dry-aged Wagyu beef patty, caramelized onion jam, truffle aioli, aged gruyère, butter-lettuce, artisan brioche. Served medium rare.",
    category: "burgers",
    image: "/assets/wagyu-burger.png",
    tags: ["Wagyu A5"],
    dietary: ["GF OPTION"]
  },
  {
    id: "item-2",
    name: "Smoked Brisket Smash",
    price: 28,
    description: "Double dry-aged beef patties, house-smoked brisket, bourbon BBQ glaze, crispy shallots, smoked gouda.",
    category: "burgers",
    image: "/assets/raw-patty.png",
    tags: ["Oak Smoked"]
  },
  {
    id: "item-3",
    name: "Truffle Pommes Frites",
    price: 14,
    description: "Hand-cut russet potatoes, white truffle oil, parmigiano-reggiano, fresh parsley, roasted garlic aioli.",
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
    category: "drinks",
    image: "/assets/customers-dining.png",
    tags: ["Craft Cocktail"]
  },
  {
    id: "item-6",
    name: "Charred Fig Cake",
    price: 18,
    description: "Wood-charred black mission figs, wild clover honey cake, fresh mascarpone whipped cream.",
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
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredItems = activeFilter === "all" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeFilter);

  const categories = [
    { key: "all", label: "All Offerings" },
    { key: "burgers", label: "Burgers" },
    { key: "sides", label: "Sides" },
    { key: "drinks", label: "Drinks" },
    { key: "desserts", label: "Desserts" }
  ];

  return (
    <section className="section-padding bg-background border-y border-outline-variant/20" id="menu">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="label-caps text-primary tracking-widest block mb-4">
            Curated Selections
          </span>
          <h2 className="headline-md text-on-surface">The Dining Menu</h2>
          <p className="body-md text-on-surface-variant max-w-md mx-auto pt-2">
            An elemental exploration of fire, cuts, and culinary restraint.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center border-b border-outline-variant/20 pb-4 mb-16 gap-8 select-none">
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

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="menu-item-card transition-all duration-300">
              <div className="menu-card card-sharp">
                
                {/* Visual */}
                <div className="menu-card-img-wrapper">
                  <Image
                    className="menu-card-img"
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                  />
                </div>

                {/* Content */}
                <div className="menu-card-content">
                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-2xl font-bold text-white">{item.name}</h3>
                      <span className="font-serif text-lg text-primary font-bold">${item.price}</span>
                    </div>
                    <p className="body-md text-on-surface-variant text-sm line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-auto">
                    <div className="flex gap-2 flex-wrap">
                      {item.tags.map(tag => (
                        <span key={tag} className="chip chip-gold text-[10px]">
                          {tag}
                        </span>
                      ))}
                      {item.dietary?.map(diet => (
                        <span key={diet} className="chip text-[10px]">
                          {diet}
                        </span>
                      ))}
                    </div>
                    
                    <button 
                      className="text-primary font-bold hover:text-white transition-colors label-caps text-xs uppercase cursor-pointer"
                      onClick={onOpenReservations}
                    >
                      Book Table
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
