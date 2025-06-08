# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a TypeScript monorepo using npm workspaces with the following structure:
- `apps/frontend` - Next.js application (port 3000)
- `apps/backend` - Hono API server (port 3001)
- `packages/shared` - Shared TypeScript types and utilities

The frontend proxies API requests to the backend via Next.js rewrites configuration.

## Development Commands

### Start Development Servers
```bash
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start only Next.js (port 3000)
npm run dev:backend      # Start only Hono server (port 3001)
```

### Build Commands
```bash
npm run build            # Build all workspaces
npm run build:frontend   # Build Next.js app
npm run build:backend    # Build Hono server
```

### Code Quality
```bash
npm run lint             # Lint all workspaces
npm run typecheck        # Type check all workspaces
npm run test             # Run tests (when implemented)
```

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React 18, TypeScript
- **Backend**: Hono with Node.js adapter, TypeScript
- **Shared**: Common TypeScript types and interfaces
- **Build Tools**: TypeScript, ESLint, tsx for development

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/trends` - Fetch trends data

## Development Notes

- Frontend runs on port 3000, backend on port 3001
- API routes are proxied from frontend to backend
- Shared types are available in both apps via `@shared/types`
- Use `tsx watch` for backend development with hot reload