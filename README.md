# CineView - A Vercel-Safe Next.js Movie Directory

CineView is a production-ready, modern movie directory website built with Next.js, designed to be fully static and optimized for deployment on Vercel. It showcases best practices for building performant, statically-generated sites with the Next.js App Router, avoiding common pitfalls that lead to build errors and client-side rendering bailouts.

The project is inspired by minimalist, dark-themed UIs like Letterboxd and TMDB, focusing on typography, clean spacing, and subtle interactive elements.

## Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Rendering**: Static Site Generation (SSG) with Incremental Static Regeneration (ISR)
- **Deployment**: [Vercel](https://vercel.com/)

## Core Features

- **Static First**: Pages are statically generated at build time for maximum performance. Detail and Genre pages use ISR to refresh data periodically.
- **Vercel-Safe Filtering**: Movie filtering and sorting are handled server-side via URL `searchParams`, keeping pages static and avoiding `useSearchParams` hook errors in server components.
- **Dynamic Pages**: All dynamic routes for movies (`/movies/[slug]`) and genres (`/genre/[genre]`) are pre-rendered using `generateStaticParams`.
- **Dark Mode**: A beautiful, dark-by-default theme with a light mode toggle, with the preference saved to `localStorage`.
- **SEO Optimized**: Dynamic metadata generation, OpenGraph tags, a `sitemap.ts`, and `robots.ts` are all included.
- **AI-Powered Recommendations**: A "Related Movies" section on detail pages uses a Genkit AI flow to suggest similar movies based on genre.

## Data Generation

The movie dataset is a static JSON file located at `/data/movies.json`. It was programmatically generated and contains over 80 fictional movie entries. This approach ensures the entire application can be built and rendered without any external API calls, making it fast, reliable, and free to operate.

## How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at [http://localhost:9002](http://localhost:9002).

4.  **Build for production:**
    To ensure the project builds correctly as it would on Vercel, run:
    ```bash
    npm run build
    ```
    This command will statically generate all pages and report any potential errors.

