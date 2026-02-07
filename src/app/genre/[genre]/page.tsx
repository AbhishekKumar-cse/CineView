import { getGenres, getMoviesByGenre } from '@/lib/movies';
import { MovieCard } from '@/components/movie-card';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 3600; // Revalidate at most every hour
export const dynamicParams = false;

export async function generateStaticParams() {
  const genres = getGenres();
  return genres.map((genre) => ({
    genre: genre.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { genre: string };
}): Promise<Metadata> {
  const genre = getGenres().find(g => g.toLowerCase() === params.genre);

  if (!genre) {
    return {
      title: 'Genre Not Found',
    };
  }

  return {
    title: `${genre} Movies`,
    description: `Browse all movies in the ${genre} genre on CineView.`,
  };
}

export default function GenrePage({ params }: { params: { genre: string } }) {
  const movies = getMoviesByGenre(params.genre);
  const genreName = getGenres().find(g => g.toLowerCase() === params.genre);


  if (!genreName) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-headline text-4xl font-bold md:text-5xl">
        {genreName} Movies
      </h1>
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
            There are currently no movies listed under this genre.
          </p>
        </div>
      )}
    </div>
  );
}
