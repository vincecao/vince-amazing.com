# Personal website

Entrance: [vince-amazing.com](//vince-amazing.com)

## 🏗️ Vertical Slice Architecture

This project uses a **Vertical Slice Architecture** that organizes code by business features rather than technical layers, achieving high cohesion within features and low coupling between them.

### 🎯 **Feature Slices** (`src/features/`)

Each feature contains everything needed for that business capability:

- **`blog/`** - Blog posts and content management
  - `domain/` - Blog entities and business rules
  - `application/` - Blog use cases and workflows
  - `infra/` - Blog data access (file system, markdown) with dependency injection
  - `presentation/` - Blog UI components and adapters

- **`photos/`** - Photo gallery and management
  - `domain/` - Photo entities and business rules
  - `application/` - Photo use cases and workflows
  - `infra/` - Photo data access (Flickr API) with dependency injection
  - `presentation/` - Photo UI components

### 🌐 **Shared Infrastructure** (`src/shared/`)
- **`assets/`** - Website assets (fonts, PDFs, images)
- **`helpers/`** - Pure utility functions
- **`hooks/`** - Custom React hooks
- **`components/`** - Reusable UI components (Button, etc.)

