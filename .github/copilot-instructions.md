# Copilot AI Coding Agent Instructions for SnapVote

## Project Overview
- **SnapVote** is a modern polling app built with Next.js (App Router), React 19, TailwindCSS, and Supabase for authentication.
- The codebase is organized by feature: `/app` (routing/pages), `/components` (UI and forms), `/contexts` (React context), `/hooks`, `/lib` (utils/services), `/types`.
- Forms use **react-hook-form** with **zod** for validation. UI components are built on Radix UI primitives and custom wrappers.

## Key Architectural Patterns
- **App Router**: All routing and page logic is in `/app`. API routes are in `/app/api`.
- **Component-Driven**: UI is composed from small, reusable components in `/components/ui` and feature-specific components in `/components/polls`, `/components/auth`, etc.
- **State Management**: Uses React Context for auth and toast notifications. No Redux/MobX.
- **API Integration**: Client-side fetches to `/api/polls` and other endpoints. Supabase is used for auth/session.
- **Validation**: All forms use zod schemas for validation, enforced both client and server side.

## Developer Workflows
- **Dev Server**: `npm run dev` (Next.js, hot reload)
- **Build**: `npm run build` (Next.js production build)
- **Test**: `npm test` (Jest, React Testing Library)
  - Test files mirror the app structure under `__tests__`.
  - Use mocks for external dependencies (API, router, Supabase, Radix UI, lucide-react, etc.).
- **Environment**: Set up `.env.local` with Supabase keys as shown in the README.

## Project-Specific Conventions
- **Component Imports**: Use `@/components/...` and `@/hooks/...` aliases (see `tsconfig.json`).
- **UI Composition**: Prefer composition of small UI primitives. Use Radix UI for accessibility.
- **Form Patterns**: Use `<FormField name=...>{({field}) => <Input {...field} ... />}</FormField>` for all form fields.
- **Testing**: Always mock third-party UI and hooks in tests. See `__tests__/components/polls/create-poll-form.test.tsx` for patterns.
- **API**: All API endpoints are in `/app/api`. Use fetch with JSON for client-server communication.

## Integration Points
- **Supabase**: Used for authentication and user management. See `/lib/auth` and `/lib/supabase`.
- **Radix UI**: All custom UI components wrap Radix primitives for accessibility.
- **Zod**: All validation schemas are in the form files or `/lib`.

## Examples
- **Form Example**: See `components/polls/create-poll-form.tsx` for a full-featured form with dynamic fields, zod validation, and react-hook-form integration.
- **Test Example**: See `__tests__/components/polls/create-poll-form.test.tsx` for how to mock UI, hooks, and test form logic.

## Tips for AI Agents
- When adding new forms, always use zod + react-hook-form.
- When writing tests, always mock external UI and hooks.
- Use the project aliases for imports.
- Follow the existing folder structure for new features/components.

---
If any section is unclear or missing, please ask for clarification or request more details from the maintainers.
