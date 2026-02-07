import { getFilteredMovies, getGenres } from '@/lib/movies';
import { MovieCard } from '@/components/movie-card';
import { SearchBar } from '@/components/search-bar';
import { SortDropdown } from '@/components/sort-dropdown';
import { GenreBadge } from '@/components/genre-badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'All Movies',
  description: 'Search, filter, and sort through the entire CineView library.',
};

export default function MoviesPage({
  searchParams,
}: {
  searchParams: {
    genre?: string;
    sort?: string;
    search?: string;
  };
}) {
  const movies = getFilteredMovies(searchParams);
  const genres = getGenres();
  const { genre: activeGenre, search } = searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="w-full md:w-1/2 lg:w-1/3">
          <SearchBar />
        </div>
        <SortDropdown />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Link href="/movies">
          <Button variant={!activeGenre ? 'secondary' : 'outline'} className="rounded-full">All</Button>
        </Link>
        {genres.map((genre) => (
          <Link key={genre} href={`/movies?genre=${genre.toLowerCase()}`}>
            <Button variant={activeGenre === genre.toLowerCase() ? 'secondary' : 'outline'} className="rounded-full">{genre}</Button>
          </Link>
        ))}
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold">No Movies Found</h2>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filters.
          </p>
          <Button asChild className="mt-4">
            <Link href="/movies">Clear Filters</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
