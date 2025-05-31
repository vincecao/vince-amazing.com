# Personal website

Entrance: [vince-amazing.com](//vince-amazing.com)

## 🏗️ Clean Architecture Layers

### 💼 **Application Layer** (`src/application/`)
- **Use Cases**: Business logic and orchestration

### 🏛️ **Domain Layer** (`src/domain/`)
- **Entities**: Core business objects (`Photo`, `Post`)
- **Interfaces**: Repository contracts defining data access patterns

### 🔧 **Infrastructure Layer** (`src/infra/`)
- **Repositories**: Concrete data access implementations
- **Services**: External service integrations (Redis, APIs)
- **Container**: Dependency injection and configuration

### 🎨 **Presentation Layer** (`src/presentation/`)
- **Components**: Feature-specific UI components
- **Services**: Coordinate use cases for UI needs
- **Adapters**: Transform domain data for UI consumption

### 🌐 **Shared Layer** (`src/shared/`)
- **Assets**: Website assets, e.g. font, pdfs
- **Hooks**: Custom React hooks
- **Helpers**: Pure utility functions
- **Consts**: Common constant variables


