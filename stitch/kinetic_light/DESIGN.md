---
name: Kinetic Light
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#514255'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#837186'
  outline-variant: '#d4c0d7'
  surface-tint: '#9900cf'
  primary: '#9700cd'
  on-primary: '#ffffff'
  primary-container: '#bd00ff'
  on-primary-container: '#ffffff'
  inverse-primary: '#ecb2ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#0059c0'
  on-tertiary: '#ffffff'
  tertiary-container: '#2372e5'
  on-tertiary-container: '#ffffff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f8d8ff'
  primary-fixed-dim: '#ecb2ff'
  on-primary-fixed: '#320047'
  on-primary-fixed-variant: '#74009f'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

This design system transitions the high-energy, tech-focused Kinetic aesthetic into a professional, high-clarity Light Mode environment. The brand personality is precise, energetic, and premium, targeting a professional audience that values both efficiency and modern flair. 

The design style is **Corporate Modern with Glassmorphism accents**. It leverages the expansive feel of white space and high-contrast typography to ensure readability, while maintaining its "high-tech" soul through vibrant purple accents, subtle translucent layers, and razor-sharp geometric precision. The emotional response should be one of clarity and "controlled power"—a clean workspace that feels fast and sophisticated.

## Colors

The palette is anchored by a pristine **#F8FAFC (Slate 50)** background to reduce eye strain while maintaining a cooler, "tech" temperature compared to pure white. 

- **Primary (#BD00FF):** Used exclusively for high-intent actions, active states, and brand highlights. It should be used sparingly to maintain its "Kinetic" impact.
- **Secondary / Text (#0F172A):** A deep charcoal used for primary headings and body text to ensure WCAG AAA contrast levels.
- **Surface & Borders:** Containers use **#FFFFFF** with a subtle **#E2E8F0** border to define boundaries without adding visual weight.
- **Accents:** Success, warning, and info states utilize slightly desaturated professional tones to ensure they do not compete with the primary purple.

## Typography

The typography system relies on **Geist** for its clinical, developer-friendly precision and exceptional legibility in light environments. For technical metadata and system labels, **JetBrains Mono** is utilized to reinforce the high-tech narrative.

- **Headlines:** Should use tighter letter spacing and heavy weights to command attention. 
- **Body:** Uses a generous line height (1.5x+) to maximize readability against the bright background.
- **Labels:** Always set in all-caps when using the monospaced font for a structured, industrial feel.

## Layout & Spacing

The layout follows a **Fluid Grid** philosophy with a 12-column structure for desktop. To maintain the professional feel, the design system utilizes a strict 4px/8px baseline grid.

- **Desktop:** 12 columns, 24px gutters, and 40px outer margins. Content is generally capped at 1440px wide to prevent line lengths from becoming unreadable.
- **Tablet:** 8 columns, 16px gutters, 24px margins.
- **Mobile:** 4 columns, 16px gutters, 16px margins.

Use "Negative Space" as a functional element—sections should be clearly demarcated by large vertical gaps (lg/xl units) rather than heavy dividers.

## Elevation & Depth

In Light Mode, depth is achieved through **Tonal Layers** and **Ambient Shadows**. This design system avoids heavy drop shadows in favor of subtle "elevation blurs."

- **Level 0 (Background):** #F8FAFC.
- **Level 1 (Cards/Containers):** #FFFFFF with a 1px #E2E8F0 border.
- **Level 2 (Dropdowns/Modals):** #FFFFFF with a soft, diffused shadow: `0 10px 15px -3px rgba(15, 23, 42, 0.08)`.
- **Glassmorphism:** For navigation bars and floating overlays, use a background blur of 12px with a 70% opacity white fill. This maintains the "premium" feel of the original system while adapting to the light theme.

## Shapes

The shape language is **Soft** but disciplined. We use a base radius of 4px (0.25rem) for most small components like checkboxes and small buttons to maintain a "sharp" professional look. Larger containers and cards use 8px (0.5rem) to feel approachable but structured. 

Avoid full pill shapes for standard buttons; keep them slightly squared with `rounded-md` (0.375rem) to align with the geometric Geist typeface.

## Components

- **Buttons:** 
    - **Primary:** Solid #BD00FF with white text. On hover, use a slight scale up (1.02x) and a subtle glow.
    - **Secondary:** Transparent with a #BD00FF border and text. 
    - **Ghost:** No border, #0F172A text, #F1F5F9 background on hover.
- **Inputs:** White background, 1px #E2E8F0 border. On focus, the border becomes #BD00FF with a 2px soft outer glow.
- **Chips:** Light grey background (#F1F5F9) with #475569 text. For active states, use light purple (#F5E6FF) with #BD00FF text.
- **Cards:** White background, 1px #E2E8F0 border. No shadow in default state; on hover, apply Level 2 shadow and a 1px #BD00FF left-accent border.
- **Lists:** Use subtle #F1F5F9 horizontal dividers. Row hover states should use a very faint #F8FAFC background.
- **Navigation:** Top-bar with 70% opacity blur and a thin #E2E8F0 bottom border. Active links should be signaled by a 2px #BD00FF bottom underline.