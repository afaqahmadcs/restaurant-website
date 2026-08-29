import React from "react";
import Image from "next/image";

export default function Anatomy() {
  return (
    <section className="anatomy-container" id="anatomy">
      {/* Desktop Layout (Split Sticky Anatomy) */}
      <div className="hidden md:block">
        <div className="anatomy-sticky-section">
          <div className="anatomy-grid">
            {/* Left Side: Explaining Text Layers */}
            <div className="anatomy-texts">
              <div className="space-y-16">
                <div>
                  <span className="label-caps text-primary tracking-widest mb-4 block">
                    The Construct
                  </span>
                  <h2 className="headline-md text-on-surface mb-6">
                    EVERY LAYER
                    <br />
                    MATTERS.
                  </h2>
                  <p className="body-md text-on-surface-variant max-w-sm">
                    Our Signature Wagyu Burger is not merely assembled; it is
                    orchestrated. Sourced with uncompromising intention.
                  </p>
                </div>

                <div className="space-y-8 border-t border-outline-variant/30 pt-8 max-w-sm">
                  {/* Layer 1 */}
                  <div>
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
                  <div>
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
                  <div>
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
                  <div>
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

            {/* Right Side: Stacked burger slices */}
            <div className="anatomy-visual-container">
              <div className="relative w-[380px] h-[550px] flex items-center justify-center">
                <Image
                  id="layer-crown"
                  src="/assets/wagyu-burger.png"
                  alt="Burger Crown slice"
                  width={380}
                  height={550}
                  className="burger-layer-slice"
                  style={{ transform: "translateY(-60px)" }}
                />
                <Image
                  id="layer-tomato"
                  src="/assets/wagyu-burger.png"
                  alt="Heirloom Tomato slice"
                  width={380}
                  height={550}
                  className="burger-layer-slice"
                  style={{ transform: "translateY(-20px)" }}
                />
                <Image
                  id="layer-cheese"
                  src="/assets/wagyu-burger.png"
                  alt="Truffle Cheddar slice"
                  width={380}
                  height={550}
                  className="burger-layer-slice"
                  style={{ transform: "translateY(15px)" }}
                />
                <Image
                  id="layer-patty"
                  src="/assets/wagyu-burger.png"
                  alt="Wagyu Patty slice"
                  width={380}
                  height={550}
                  className="burger-layer-slice"
                  style={{ transform: "translateY(55px)" }}
                />
                <Image
                  id="layer-heel"
                  src="/assets/wagyu-burger.png"
                  alt="Burger Heel slice"
                  width={380}
                  height={550}
                  className="burger-layer-slice"
                  style={{ transform: "translateY(95px)" }}
                />
              </div>
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
          <div className="group border-b border-outline-variant/30 pb-8 space-y-4">
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
          <div className="group border-b border-outline-variant/30 pb-8 space-y-4">
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
          <div className="group border-b border-outline-variant/30 pb-8 space-y-4">
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
          <div className="group border-b border-outline-variant/30 pb-8 space-y-4">
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
