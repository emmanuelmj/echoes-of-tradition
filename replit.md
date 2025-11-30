# Echoes of Tradition - Indo-Global Heritage Website

## Overview

A museum-quality editorial website celebrating India's cultural heritage and its global influence. The project presents rich visual storytelling through carefully curated sections showcasing Indian architecture, philosophy, and cultural traditions. Built with React and Express, the application features immersive sections including a hero landing, cultural pillars showcase, historical timeline, and masonry-style gallery.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management

**UI Component System:**
- shadcn/ui components built on Radix UI primitives for accessible, customizable components
- Custom theming system using CSS variables for the "Saffron & Stone" color palette
- Tailwind CSS for utility-first styling with custom configuration extending base colors

**Design Implementation:**
- Typography hierarchy using Google Fonts: 'Cinzel' (serif, headings) and 'Lato' (sans-serif, body text)
- Custom color palette: Terracotta (#E35639), Emerald Green (#2E5D4B), Parchment (#F9F7F2), Slate (#2D3748), Antique Gold (#C5A059)
- Responsive design with mobile-first breakpoints
- Intersection Observer-based scroll animations via custom `useScrollAnimation` hook
- Hover interactions with CSS transitions for card reveals and image overlays

**Key Components:**
- `HeroSection`: Full-screen hero with background image, smooth scroll navigation
- `IntroductionSection`: Centered content with ornamental dividers (mandala, geometric, lotus patterns)
- `CulturalPillarsSection`: 3-column responsive grid with hover-triggered caption reveals
- `TimelineSection`: Alternating left/right timeline with circular image nodes
- `GallerySection`: Masonry-style grid with modal dialog for detailed views
- `OrnamentalDivider`: SVG-based decorative elements for visual separation

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- HTTP server created with Node's native `http` module
- Middleware: JSON body parsing with raw body capture, URL-encoded form data support

**API Design:**
- RESTful endpoints serving static content data
- Routes for cultural pillars (`/api/pillars`, `/api/pillars/:id`)
- Timeline eras endpoints (`/api/timeline`, `/api/timeline/:id`)
- Gallery endpoints with category filtering (`/api/gallery`, `/api/gallery/category/:category`)
- Static file serving for built client assets with SPA fallback

**Data Management:**
- In-memory data storage for cultural content (pillars, timeline eras, gallery items)
- Schema definitions using TypeScript interfaces
- Sample data embedded in shared schema file
- User storage interface with in-memory implementation using Map

**Development Features:**
- Custom logging middleware with timestamp formatting
- Request/response duration tracking
- Vite middleware integration in development mode
- HMR (Hot Module Replacement) support via WebSocket

### Database Architecture

**ORM & Schema:**
- Drizzle ORM configured for PostgreSQL
- Schema definitions in TypeScript with Drizzle's table builders
- Zod integration for runtime validation via `drizzle-zod`
- User table with UUID primary keys using `gen_random_uuid()`

**Database Provider:**
- Configured for Neon Database (serverless PostgreSQL)
- Connection via `@neondatabase/serverless` driver
- Environment-based database URL configuration
- Migration support through Drizzle Kit

**Current Schema:**
- Users table with username/password authentication fields
- Type-safe insert and select schemas derived from table definitions
- Content types (CulturalPillar, TimelineEra, GalleryItem) defined as TypeScript interfaces (not yet persisted to database)

**Design Decision:**
The application currently serves cultural content from static in-memory data defined in the schema file rather than from the database. This allows for rapid prototyping and ensures consistent content delivery. Future enhancement would involve migrating this content to database tables for dynamic content management.

### Authentication & Session Management

**Infrastructure Ready:**
- Session store configuration using `connect-pg-simple` for PostgreSQL-backed sessions
- User schema with username/password fields
- Storage interface with CRUD methods for user management

**Not Yet Implemented:**
- Password hashing (bcrypt/argon2)
- Passport.js authentication strategies
- Session middleware configuration
- Login/logout endpoints

## External Dependencies

### UI & Component Libraries
- **Radix UI**: Comprehensive suite of accessible, unstyled UI primitives (accordion, dialog, dropdown, popover, etc.)
- **Tailwind CSS**: Utility-first CSS framework with PostCSS integration
- **class-variance-authority (CVA)**: Type-safe variant API for component styling
- **Embla Carousel**: Carousel/slider functionality for potential image galleries
- **Lucide React**: Icon library for UI elements
- **React Day Picker**: Calendar component (available but not currently used)

### Data Fetching & State
- **TanStack Query**: Powerful async state management with caching, background updates, and request deduplication
- **React Hook Form**: Form state management with `@hookform/resolvers` for validation integration
- **Zod**: TypeScript-first schema validation

### Database & ORM
- **Neon Database**: Serverless PostgreSQL database (via `@neondatabase/serverless`)
- **Drizzle ORM**: TypeScript ORM with migration support via `drizzle-kit`
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Fonts & Assets
- **Google Fonts**: Cinzel (decorative serif) and Lato (readable sans-serif)
- **Font Awesome**: Icon font library for social media and UI icons
- Unsplash for placeholder/hero images

### Build & Development Tools
- **Vite**: Fast build tool with HMR and optimized production builds
- **esbuild**: JavaScript bundler for server-side code compilation
- **tsx**: TypeScript execution for development server and build scripts
- **Replit plugins**: Development banner, error modal, and cartographer for Replit environment integration

### Utilities
- **date-fns**: Date manipulation and formatting
- **nanoid**: Unique ID generation
- **clsx & tailwind-merge**: Conditional className utilities