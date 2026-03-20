```markdown
# Design System Documentation: The Neon Grimoire

## 1. Overview & Creative North Star

### Creative North Star: "The Neon Grimoire"
The aesthetic of this design system is a high-octane collision between 1980s OVA cyberpunk (Bubblegum Crisis) and the ethereal, shimmering grace of the magical girl genre. We are moving away from "flat" utility into "Ethereal Cyber-Couture." The UI should feel like a digital spellbook—a high-end, bespoke interface where cold machine logic meets whimsical energy.

To break the "template" look, this design system rejects rigid, symmetric grids in favor of **Intentional Asymmetry**. We utilize overlapping "shards" of data, high-contrast typography scales, and "data-leak" glows to create a sense of depth and narrative. Every element should feel like it was forged in a transformation sequence, polished to a mirror finish, and powered by neon-infused sorcery.

---

## 2. Colors & Surface Philosophy

### The Palette
The color strategy relies on a "Void and Bloom" approach. We use a deep, obsidian base to allow our high-saturation neon tokens to "pop" with an almost radioactive quality.

- **Primary (`#ffaed8`):** The "Transformation Pink." Used for critical actions and brand signatures.
- **Secondary (`#a9ffde`):** The "Cyber Cyan." Used for technical data, success states, and cybernetic accents.
- **Tertiary (`#eab2ff`):** The "Arcane Lavender." Used for magical flourishes, secondary highlights, and soft depth.
- **Neutral/Background (`#190f23`):** The "Deep Void." A saturated dark purple that feels more premium and intentional than pure black.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. Structural boundaries must be defined solely through background color shifts.
- Use `surface-container-low` against `surface` to define sections.
- For a more dramatic break, use `surface-container-highest` to draw the eye to specific modules.

### Glassmorphism & Signature Textures
To achieve the "Magical Girl" polish, floating elements (modals, dropdowns, navigation rails) must use **Glassmorphism**. 
- **Recipe:** Apply a semi-transparent `surface` color with a `backdrop-blur` of 12px to 20px.
- **Gradients:** CTAs should utilize a subtle linear gradient from `primary` to `primary_container`. This adds a "soul" to the component that flat hex codes lack.

---

## 3. Typography: The Technical Serif

The typography hierarchy is designed to oscillate between "Cold Machine" and "Elegant Sorceress."

- **Display & Headlines (Orbitron):** The geometric, wide-stanced architecture of Orbitron provides the "Tech" foundation. Use `display-lg` for hero moments with wide letter-spacing (+5%) to mimic high-end editorial layouts.
- **Sub-Headlines & UI Labels (Chakra Petch):** This font brings the "Cyber" energy. Its chamfered edges feel like etched circuitry. Use this for `label-md` and `headline-sm` to denote technical data points.
- **Body & Titles (Inter):** The "Anchor." Inter provides the necessary legibility to ground the more expressive fonts. Use `body-md` for all long-form content to ensure the interface remains usable.

---

## 4. Elevation & Depth

### The Layering Principle
Depth is achieved through **Tonal Layering** rather than shadows. 
1. **Base:** `surface` (The foundation).
2. **Layout Sections:** `surface-container-low` (Subtle nesting).
3. **Interactive Components:** `surface-container-high` (Raised elements).

### Ambient Shadows
If a floating effect is required (e.g., a "Magical" popover), use an **Ambient Shadow**:
- **Blur:** 40px - 60px.
- **Opacity:** 6% - 10%.
- **Color:** Use a tinted version of `on-surface` or `primary` to mimic light bleed from the UI itself.

### The "Ghost Border"
When accessibility requires a container boundary, use the **Ghost Border**. Apply `outline-variant` at 15% opacity. This creates a suggestion of a border that feels like a laser-etched glass edge rather than a heavy stroke.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`). On hover, apply a "Bloom" effect (a 15px outer glow using the `primary` color at 30% opacity).
- **Secondary:** Ghost Border style. No fill. Text is `secondary`.
- **Tertiary:** Text only in `tertiary`, paired with a small 4-pointed star icon (`✦`) to signify the magical aesthetic.

### Cards
Cards must never have a 100% opaque border. Use the Layering Principle:
- **Surface:** `surface-container-low`.
- **Hover State:** Shift to `surface-container-high` and add a `primary` glow to the top edge (2px height) to simulate a "power on" state.

### Input Fields
- **Base:** `surface-container-lowest`.
- **Active State:** The bottom border animates from center-out using the `secondary` color. 
- **Typography:** Placeholder text should be `label-sm` in `Chakra Petch` for a "terminal" feel.

### Magical Accents (Whimsical Elements)
- **Sparkle Motifs:** Integrate subtle star icons (`✦`) into the corners of data tables or as list bullets.
- **Data Shards:** Use the Spacing Scale to create "asymmetric padding." For example, a card may have `padding-left: 24 (6rem)` and `padding-right: 16 (4rem)` to break the boxy feel.

---

## 6. Do's and Don'ts

### Do
- **Do** use "Bloom" effects on hover for primary interactions.
- **Do** lean into `Chakra Petch` for any numerical or technical data.
- **Do** use `backdrop-blur` on all overlapping surfaces to maintain the "frosted glass" premium feel.
- **Do** utilize the `surface-container` tiers to create hierarchy.

### Don't
- **Don't** use solid black (`#000000`) or standard grey. Always use the `surface` palette.
- **Don't** use 1px solid high-contrast borders. It kills the "high-end" editorial vibe.
- **Don't** clutter the screen. Magical Girl Cyberpunk relies on the "Void"—large areas of deep purple to balance the intense neon sparks.
- **Don't** use standard "drop shadows." If it doesn't look like light is emitting from the component, don't use it.