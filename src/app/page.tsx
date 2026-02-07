import { getFeaturedMovies, getGenres } from '@/lib/movies';
import { MovieCard } from '@/components/movie-card';
import { GenreBadge } from '@/components/genre-badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Film } from 'lucide-react';

export default function Home() {
  const featuredMovies = getFeaturedMovies();
  const genres = getGenres();

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="relative mb-16 flex min-h-[60vh] flex-col items-center justify-center overflow-hidden rounded-2xl bg-primary p-8 text-center text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-background opacity-80"></div>
        <div className="absolute inset-0 z-0 opacity-10">
          <Film className="absolute left-1/4 top-1/4 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rotate-12" />
          <Film className="absolute right-1/4 top-3/4 h-48 w-48 -translate-x-1/2 -translate-y-1/2 -rotate-12" />
          <Film className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative z-10">
          <h1 className="font-headline text-5xl font-bold md:text-7xl lg:text-8xl">
            CineView
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-primary-foreground/80 md:text-xl">
            Your ultimate guide to the world of cinema. Discover, search, and
            explore thousands of movies.
          </p>
          <Button asChild size="lg" className="mt-8 group">
            <Link href="/movies">
              Explore Movies <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 font-headline text-3xl font-bold md:text-4xl">
          Featured Movies
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {featuredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 font-headline text-3xl font-bold md:text-4xl">
          Browse by Genre
        </h2>
        <div className="flex flex-wrap gap-4">
          {genres.map((genre) => (
            <GenreBadge key={genre} genre={genre} />
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="font-headline text-3xl font-bold md:text-4xl">
          Ready to Dive In?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Our entire library is just a click away. Find your next favorite film
          today.
        </p>
        <Button asChild size="lg" className="mt-8 group">
          <Link href="/movies">
            Start Exploring <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </section>
    </div>
  );
}
