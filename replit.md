# Overview

CryptoPulse is a modern cryptocurrency tracking application built with React and Express.js. The application provides real-time cryptocurrency market data, allowing users to browse, search, and track their favorite cryptocurrencies. It features a responsive design with dark/light theme support, interactive charts, and a personalized watchlist system.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using React with TypeScript and follows a modern component-based architecture:

- **Framework**: React 18 with TypeScript for type safety and better developer experience
- **Routing**: Wouter for lightweight client-side routing with support for dynamic routes
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui for consistent, accessible components
- **Styling**: Tailwind CSS with CSS variables for theming, supporting dark/light modes
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Charts**: Recharts for rendering cryptocurrency price charts and market data visualizations

The application uses a clean separation of concerns with dedicated directories for components, hooks, pages, and utilities. Custom hooks handle data fetching, local storage management, and theme switching.

## Backend Architecture

The backend follows a minimal Express.js architecture designed for extensibility:

- **Framework**: Express.js with TypeScript for API endpoints
- **Development Setup**: Vite for development server with hot module replacement
- **Storage Interface**: Abstracted storage layer with in-memory implementation and prepared database interface
- **Database Ready**: Configured for PostgreSQL with Drizzle ORM but currently using memory storage
- **Session Management**: Prepared for connect-pg-simple session store

The modular design allows easy switching between storage implementations and supports both development and production environments.

## Data Layer

**Current Implementation**: In-memory storage with TypeScript interfaces for easy database migration

**Database Schema**: Drizzle ORM schema defined for PostgreSQL with user management tables including:
- Users table with UUID primary keys, usernames, and passwords
- Prepared for additional cryptocurrency-related tables

**External API Integration**: CoinGecko API for real-time cryptocurrency data including market prices, historical charts, and global market statistics

## Authentication & State

**Local Storage**: Browser localStorage for user preferences including theme settings and cryptocurrency watchlists

**Query Caching**: TanStack Query handles API response caching with configurable stale times and automatic background refetching

**Theme Management**: React Context for global theme state with system preference detection and localStorage persistence

## Third-Party Integrations

**CoinGecko API**: Primary data source for cryptocurrency information with endpoints for market data, coin details, price history, and search functionality

**Font Integration**: Google Fonts for typography with multiple font families including Inter, Architects Daughter, DM Sans, Fira Code, and Geist Mono

# External Dependencies

## Database & ORM
- **Drizzle ORM**: Type-safe PostgreSQL ORM with schema validation
- **Neon Database**: Serverless PostgreSQL database (configured but not actively used)
- **connect-pg-simple**: PostgreSQL session store for Express sessions

## Frontend Libraries
- **React Ecosystem**: React 18, React DOM, React Router alternative (Wouter)
- **UI Framework**: Radix UI components, shadcn/ui component library
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **State Management**: TanStack React Query for server state
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion for UI animations
- **Utilities**: date-fns for date manipulation, clsx for conditional styling

## Development Tools
- **Build Tools**: Vite for development and building, ESBuild for server bundling
- **TypeScript**: Full TypeScript support across frontend and backend
- **Development**: tsx for running TypeScript files, Replit-specific development plugins

## External APIs
- **CoinGecko API**: Cryptocurrency market data, price history, and search functionality
- **No API keys required**: Uses public endpoints with rate limiting considerations

## Validation & Forms
- **Zod**: Schema validation library
- **React Hook Form**: Form state management with Zod integration
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation