# Agent Template Builder

## Overview

This is a web application that allows users to generate mini-tool projects through a visual configuration interface. Users can select structural components, interactive elements, and business logic features to create customized HTML/CSS/JavaScript applications that are delivered as downloadable ZIP files.

The application follows a full-stack architecture with a React frontend for configuration and preview, and an Express.js backend for project generation and file serving.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI primitives with shadcn/ui component system
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **State Management**: React hooks with custom state management for project configuration
- **HTTP Client**: Fetch API with TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Template Engine**: Custom template generation system for HTML/CSS/JS files
- **File Generation**: JSZip for creating downloadable project archives
- **Development**: tsx for TypeScript execution in development

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM for project persistence
- **In-Memory Storage**: Fallback storage implementation for development
- **Schema**: Projects table with JSON configuration storage

## Key Components

### Configuration System
The application uses a comprehensive configuration schema that defines:
- **Project Structure**: Header, navigation, main content, sidebar, footer toggles
- **Interactive Components**: Form validation, data tables, modals, charts
- **Business Logic**: VAT calculations, unit conversions, data export, local storage

### Template Generation Engine
Located in `server/services/templateGenerator.ts`, this system:
- Generates semantic HTML structure based on user selections
- Creates modular CSS with custom properties and responsive design
- Builds JavaScript with business logic and component interactions
- Packages everything into a downloadable ZIP archive

### UI Components
- **ConfigurationSidebar**: Project settings and feature selection interface
- **MainContent**: Tabbed interface for structure preview, file preview, and project files
- **GenerationConsole**: Real-time feedback during project generation
- **Preview System**: Live preview of generated HTML/CSS/JS code

## Data Flow

1. **Configuration Phase**: User selects project features through the sidebar interface
2. **Validation**: Frontend validates configuration using Zod schemas
3. **Generation Request**: Configuration sent to `/api/generate` endpoint
4. **Template Processing**: Backend generates HTML, CSS, and JavaScript files
5. **Archive Creation**: Files packaged into ZIP using JSZip
6. **Download Delivery**: ZIP file sent as downloadable response

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React ecosystem with Radix UI primitives
- **Styling**: Tailwind CSS with PostCSS processing
- **State Management**: TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React icon library

### Backend Dependencies
- **Database**: Drizzle ORM with PostgreSQL adapter (@neondatabase/serverless)
- **File Processing**: JSZip for archive creation
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution

### Development Tools
- **Build System**: Vite with React plugin
- **Type Checking**: TypeScript with strict configuration
- **Database Management**: Drizzle Kit for migrations
- **Replit Integration**: Development banner and runtime error overlay

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with PostgreSQL 16
- **Development Server**: Vite dev server with Express API proxy
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend
- **Port Configuration**: Frontend on port 5000, backend integrated

### Production Build
- **Frontend Build**: Vite builds optimized static assets to `dist/public`
- **Backend Bundle**: esbuild creates single ESM bundle in `dist/`
- **Database**: Production PostgreSQL with connection pooling
- **Deployment**: Autoscale deployment target on Replit infrastructure

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Static Serving**: Express serves built frontend assets in production
- **Error Handling**: Centralized error middleware with structured responses

## Changelog

Changelog:
- June 17, 2025. Initial setup
- June 17, 2025. Major upgrade to Agent Template v2.0:
  - Added support for CSS frameworks (Bulma, Pico.css)
  - Implemented 25 new components across 3 categories:
    - Form components (9): text, email, phone, textarea, select, radio, checkbox, date, buttons
    - Business components (4): VAT calculator, price simulator, filterable table, CSV export
    - UI components (12): search, notifications, progress bars, badges, copy buttons, counters, file upload, conditional display, JSON display, pagination, modals, rich editor
  - Enhanced template generation with modular component injection
  - Added FontAwesome icons and improved responsive design
  - Upgraded configuration interface with collapsible sections and component counters

## User Preferences

Preferred communication style: Simple, everyday language.