import React from "react";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 py-20 px-margin-mobile md:px-margin-desktop">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <span className="font-serif text-2xl font-bold tracking-tighter text-primary uppercase select-none">
          Ember & Grain
        </span>
        <div className="flex flex-wrap justify-center gap-8">
          <a
            className="text-on-surface-variant hover:text-primary transition-colors text-xs font-label-caps tracking-wider"
            href="#story"
          >
            Provenance
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors text-xs font-label-caps tracking-wider"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors text-xs font-label-caps tracking-wider"
            href="#"
          >
            Terms of Service
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-colors text-xs font-label-caps tracking-wider"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
        <p className="text-on-surface-variant text-xs font-label-caps tracking-wide">
          &copy; {new Date().getFullYear()} EMBER & GRAIN. CRAFTED FOR THE DISCERNING.
        </p>
      </div>
    </footer>
  );
}
