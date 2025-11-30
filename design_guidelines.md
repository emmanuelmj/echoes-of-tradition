# Design Guidelines: Echoes of Tradition - Indo-Global Heritage Website

## Design Approach
**Museum-Quality Editorial Design** inspired by high-end cultural institutions and digital museums. The aesthetic prioritizes visual storytelling with deep, informative content.

## Typography System
**Primary Font (Headings):** 'Cinzel' - Majestic, historical serif for headlines and section titles
**Secondary Font (Body):** 'Lato' - Clean, highly readable sans-serif for captions and detailed text

**Hierarchy:**
- Hero Headline: Extra large (text-6xl to text-7xl), Cinzel, bold
- Section Titles: Large (text-4xl to text-5xl), Cinzel, semibold
- Card Titles: Medium (text-2xl), Cinzel
- Body Text: Base to lg (text-base to text-lg), Lato, regular
- Captions: Small to base (text-sm to text-base), Lato, light to regular

## Color Palette: "Saffron & Stone"
- **Primary:** Deep Terracotta/Saffron (#E35639) - CTAs, accents, hover states
- **Secondary:** Muted Emerald Green (#2E5D4B) - Secondary elements, borders
- **Background:** Off-White/Parchment (#F9F7F2) - Main background
- **Text:** Dark Slate (#2D3748) - Primary text
- **Accents:** Antique Gold (#C5A059) - Decorative elements, dividers

## Layout System
**Spacing:** Use Tailwind units of 4, 8, 12, 16, 24, and 32 for consistent rhythm (p-4, m-8, gap-12, etc.)

**Container Widths:**
- Full-width sections: w-full with max-w-7xl inner containers
- Content sections: max-w-6xl
- Text content: max-w-4xl for optimal readability

## Core Sections & Components

### 1. Hero Section
- Full-screen (h-screen) background with Indian monument (Hampi/Taj Mahal placeholder)
- Dark overlay for text legibility
- Centered content: "Echoes of Tradition" headline + "Bridging the timeless heritage of India with the world" subheadline
- "Explore the Journey" button with blurred background (backdrop-blur), smooth-scroll to next section
- Button styling: Saffron background, white text, no additional hover effects (inherits default button states)

### 2. Introduction Section
- Centered layout with max-w-4xl
- Large serif text (Cinzel, text-3xl to text-4xl)
- Content: "India's culture is a tapestry woven into the global narrative."
- Ornamental dividers (mandala/geometric SVG patterns) above and below text
- Generous padding (py-24 to py-32)

### 3. Cultural Pillars (Card Grid)
- 3-column grid on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Cards: "Indian Architecture," "Philosophy (Yoga/Vedas)," "Global Influences"
- **Critical Hover Interaction:** Image darkens on hover, detailed caption (50-70 words) slides up from bottom
- Card structure: Image background, gradient overlay, caption container with transform animation
- Aspect ratio: Square or 4:3 for visual consistency

### 4. Visual Timeline
- Vertical timeline with alternating left/right layout
- Key eras: Indus Valley, Vedic Age, Silk Road trade, etc.
- Circular images (rounded-full) for each timeline node
- Center vertical line connecting nodes
- Each entry: Snapshot title (Cinzel) + detailed paragraph (Lato)
- Spacing: py-16 between timeline items

### 5. "Windows to the Past" Gallery
- Pinterest-style masonry grid (use CSS columns or grid with varying row spans)
- Content: Indian festivals, art forms (Kathakali, Madhubani), global landmarks
- **Modal/Lightbox on click:** 50/50 split layout
  - Left: Full image display
  - Right: Detailed explanation panel with title and comprehensive text
- Modal overlay: Dark backdrop with backdrop-blur
- Close button (X icon) in top-right corner

### 6. Footer
- Simple, elegant design with off-white background
- Text: "Designed by [Your Name]" 
- Links to GitHub (Emerald green color on hover)
- Padding: py-12

## Animations & Interactions
- **AOS (Animate On Scroll):** Fade-in-up effect for sections as they enter viewport
- Apply to: Section titles, cards, timeline items, gallery images
- Smooth scroll behavior for navigation links
- Hover states: Subtle scale (scale-105) for cards, color transitions for links
- Modal: Fade-in animation with backdrop blur

## Images Strategy
**Hero:** Full-screen high-quality image of Indian monument (Taj Mahal, Hampi, or temple architecture)

**Cultural Pillars Cards:** Background images for each pillar
- Architecture: Temple/palace architecture
- Philosophy: Yoga/meditation scenes
- Global Influences: Cultural exchange imagery

**Timeline:** Circular images for each era (archaeological sites, historical art)

**Gallery:** 12-15 images showcasing:
- Indian festivals (Holi, Diwali, Pongal)
- Traditional art forms (Madhubani, Kathakali, Warli)
- Global cultural landmarks
- Craft traditions and textiles

**Image Source:** Use Unsplash API with keywords: india, temple, culture, heritage, festival, tradition

## Responsive Behavior
- Hero: Maintain full-screen on all devices, stack text center
- Cards: Single column on mobile (grid-cols-1), 2 on tablet (md:grid-cols-2), 3 on desktop
- Timeline: Stack to single column on mobile with center alignment
- Gallery: 1 column mobile, 2 tablet, 3-4 desktop
- Modal: Full-screen on mobile, maintain 50/50 split on desktop
- Typography: Scale down heading sizes appropriately (text-4xl → text-3xl on mobile)

## Accessibility
- Semantic HTML5 structure (header, main, section, article, footer)
- Alt text for all images describing cultural context
- Keyboard navigation for modals and interactive elements
- Focus states visible on all interactive elements
- Sufficient color contrast (Dark Slate on Parchment background)