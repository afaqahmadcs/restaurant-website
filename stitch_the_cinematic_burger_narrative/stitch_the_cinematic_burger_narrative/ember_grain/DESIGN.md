---
name: Ember & Grain
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#bcccab'
  on-secondary: '#27341d'
  secondary-container: '#3d4b31'
  on-secondary-container: '#abba9a'
  tertiary: '#d0cecd'
  on-tertiary: '#313030'
  tertiary-container: '#b5b2b2'
  on-tertiary-container: '#454545'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#d8e8c5'
  secondary-fixed-dim: '#bcccab'
  on-secondary-fixed: '#131f09'
  on-secondary-fixed-variant: '#3d4b31'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474646'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 84px
    fontWeight: '700'
    lineHeight: 92px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 42px
    fontWeight: '600'
    lineHeight: 48px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is rooted in **Cinematic Editorial Minimalism**. It evokes the atmosphere of a high-end steakhouse reimagined for the modern artisanal burger movement. The target audience is the discerning epicurean who values craft, provenance, and a sophisticated dining environment.

The UI avoids digital-first tropes like glassmorphism or soft shadows. Instead, it leans into **structural brutalism refined by luxury typography**. It utilizes high-contrast layouts, deep tonal layering, and immense whitespace to allow hero photography to act as the primary interface element. The aesthetic is "dark luxury"—moody, immersive, and uncompromisingly premium.

## Colors

The palette is inspired by the ritual of the flame and the freshness of the harvest.

*   **Primary (Ember Gold):** Used sparingly for calls to action, active states, and premium accents. It represents the glow of the charcoal grill.
*   **Secondary (Organic Green):** A deep, desaturated forest green used for labels, dietary markers, and subtle backgrounds. It represents farm-to-table freshness.
*   **Surface Hierarchy:**
    *   **Base:** Deep Charcoal (#121212) provides the "night" backdrop.
    *   **Elevated:** Rich Black (#0A0A0A) used for high-contrast sections.
*   **Typography:** The primary text is Off-White (#F4F4F4) to ensure readability against dark backgrounds without the harshness of pure white.

## Typography

This design system employs a high-contrast typographic pairing to bridge the gap between "artisanal" and "modern."

*   **Playfair Display:** Used for all editorial headings and price points. It conveys a sense of history and culinary authority. Large sizes should use tighter letter-spacing for a dramatic, magazine-like effect.
*   **Hanken Grotesk:** A clean, contemporary sans-serif used for descriptions, UI labels, and navigation. It provides a functional counterpoint to the decorative serif.
*   **Editorial Scaling:** Use `display-lg` for hero sections where photography and text overlap. Use `label-caps` for metadata like "Grass-fed" or "Aged 28 Days."

## Layout & Spacing

The layout philosophy follows a **strict editorial grid** with generous internal padding.

*   **The Grid:** A 12-column symmetrical grid on desktop. Elements typically span 6 or 8 columns to maintain wide "white" (black) space margins.
*   **Asymmetry:** Occasionally break the grid with "hanging" images or staggered text blocks to create a dynamic, curated feel.
*   **Rhythm:** Vertical rhythm is aggressive. Large sections are separated by significant gaps (120px+) to allow the eye to rest and focus on one "course" at a time.
*   **Mobile:** Transition to a single-column layout with 20px side margins, emphasizing full-width high-resolution imagery.

## Elevation & Depth

This design system rejects traditional shadows. Depth is created through **Tonal Layering** and **Scale**.

1.  **Layers:** Backgrounds use `#121212`, while foreground cards or modal overlays use `#1A1A1A` with a subtle 1px stroke in `#2E2E2E` (Charcoal Grey).
2.  **Stroke over Shadow:** Define boundaries using thin, low-contrast borders rather than blurs. This keeps the interface feeling "sharp" and "printed."
3.  **The "Lightbox" Effect:** When an item is selected (e.g., a burger detail), the background dims further, and the image scales up, creating an immersive focus without using Z-axis shadows.

## Shapes

The design system utilizes **Sharp (0px)** corners for all primary containers, buttons, and images. 

This architectural choice reinforces the "modern" and "sophisticated" aspect of the brand, moving away from the "soft/friendly" look of casual fast-food apps. Sharp edges communicate precision and high-end craft. Small UI elements like checkboxes or indicators may use a microscopic 2px radius only if necessary for clarity, but the default is strictly geometric.

## Components

*   **Buttons:**
    *   *Primary:* Solid Ember Gold background with Black text. All caps, bold Hanken Grotesk. No radius.
    *   *Secondary:* Transparent with a 1px Off-White border. Ghost style.
*   **Menu Cards:** Feature a large, full-bleed photograph on the top. The bottom half is Rich Black with the title in Playfair Display and the price in Ember Gold.
*   **Input Fields:** Minimalist under-line style. No box. The label sits above in `label-caps`. Focus state changes the bottom border to Ember Gold.
*   **Chips/Tags:** Small rectangular boxes with 1px Green borders for dietary info (e.g., "Vegan", "Gluten-Free").
*   **Lists:** High-contrast list items separated by thin 1px `#2E2E2E` lines. Large spacing between items to maintain the editorial feel.
*   **Immersive Scroller:** A custom component for the digital menu that uses parallax effects on food photography as the user scrolls.
