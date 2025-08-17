# AI Rules for Creative Application

This document outlines the core technologies and library usage guidelines for developing the Creative application. Adhering to these rules ensures consistency, maintainability, and optimal performance.

## Tech Stack Overview

*   **React Framework**: Next.js for server-side rendering, routing, and API routes.
*   **Language**: TypeScript for type safety and improved developer experience.
*   **Styling**: Tailwind CSS for utility-first CSS, enabling rapid and consistent UI development.
*   **UI Components**: `shadcn/ui` components, built on Radix UI primitives, for accessible and customizable UI elements.
*   **Icons**: `lucide-react` for a comprehensive set of vector icons.
*   **Backend & Authentication**: Supabase for database, authentication, and real-time functionalities.
*   **Form Management**: `react-hook-form` for efficient form handling, paired with `zod` for schema validation.
*   **Charting**: `recharts` for creating responsive and interactive data visualizations.
*   **Animations**: `framer-motion` for declarative and performant animations.
*   **Toast Notifications**: `sonner` for elegant and customizable toast messages.
*   **Responsive Design**: All components and layouts must be responsive, utilizing Tailwind CSS utilities.

## Library Usage Rules

To maintain a consistent and efficient codebase, please follow these guidelines when implementing new features or modifying existing ones:

*   **React Framework**: Always use Next.js for page creation (`app/` directory) and API routes.
*   **Language**: Write all new code in TypeScript.
*   **Styling**: Exclusively use Tailwind CSS for all styling. Avoid inline styles or separate CSS files unless absolutely necessary for third-party integrations that don't support Tailwind.
*   **UI Components**:
    *   Prioritize `shadcn/ui` components for all UI elements (e.g., Button, Card, Input, Dialog, Tabs).
    *   Do NOT modify the `components/ui` files directly. If a `shadcn/ui` component needs customization beyond its props, create a new component that wraps or extends it.
*   **Icons**: Use icons from `lucide-react`.
*   **Forms**: Implement all forms using `react-hook-form` for state management and `zod` for validation schemas.
*   **Backend Interactions**: All data fetching and mutations involving the database or authentication should use the Supabase client (`@supabase/supabase-js` and `@supabase/ssr`).
*   **Charts**: For any data visualization, use `recharts`.
*   **Animations**: For interactive UI animations, leverage `framer-motion`.
*   **Notifications**: Use `sonner` for all user feedback notifications (e.g., success messages, error alerts).
*   **Routing**: Utilize Next.js's file-system based routing. For client-side navigation, use `next/link` and `next/navigation` hooks (`useRouter`, `usePathname`).
*   **State Management**: For component-specific state, use React's `useState` and `useReducer`. For shared state, consider React Context API (`useContext`) if appropriate, but avoid over-engineering with complex global state libraries unless explicitly required for large-scale state.
*   **File Structure**:
    *   Pages should reside in the `app/` directory (Next.js convention).
    *   Reusable UI components should be in `components/`.
    *   Custom React hooks should be in `hooks/`.
    *   Utility functions should be in `lib/`.
    *   Global styles are in `app/globals.css`.
*   **Error Handling**: Do not wrap API calls or asynchronous operations in `try/catch` blocks unless specifically requested for user-facing error messages. Let errors bubble up for centralized handling and debugging.
*   **Simplicity**: Always aim for the simplest and most elegant solution. Avoid over-engineering.