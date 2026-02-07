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

## Deployment to Vercel

Deploying CineView to Vercel is seamless:

1.  Push your code to a Git repository (e.g., GitHub, GitLab).
2.  Import the repository into your Vercel account.
3.  Vercel will automatically detect the Next.js project and configure the build settings.
4.  Click "Deploy". The project is architected to build without any configuration changes.

## AI Prompts Used

This project's architecture was guided by a master prompt designed to prevent common Vercel build errors. Here are a few key instructions from that prompt:

1.  **Vercel-Safe Search Params:**
    > For filtering and sorting, use the App Router page signature: `export default function Page({ searchParams }: { searchParams: { genre?: string; sort?: string; search?: string } })`. This keeps the page fully static and Vercel-safe. DO NOT USE `useSearchParams()` in pages.

2.  **Static Generation for Dynamic Routes:**
    > For detail pages (`/movies/[slug]`) and genre pages (`/genre/[genre]`), you must use `generateStaticParams` to pre-generate all pages from the dataset. Also include `export const revalidate = 3600` for ISR and `export const dynamicParams = false`.

3.  **AI for Related Content:**
    > On the movie detail page, include a "Related Movies" section. Use a GenAI flow that takes the current movie's genres as input and recommends other movies from the static dataset that share those genres.

## Potential Improvements (with 2 more days)

- **Pagination**: Implement pagination on the `/movies` listing page to handle larger datasets gracefully.
- **Advanced Filtering**: Add more filter options, such as filtering by year range or director.
- **User Authentication**: Introduce user accounts to allow features like watchlists, ratings, and reviews.
- **Animations & Transitions**: Enhance the UI with more sophisticated page transitions and micro-interactions using a library like Framer Motion.
- **Testing**: Add unit and integration tests with Jest and React Testing Library to ensure code quality and prevent regressions.
