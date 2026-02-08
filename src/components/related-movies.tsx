import { getRelatedMovies } from '@/ai/flows/related-movies';
import { MovieCard } from './movie-card';

interface RelatedMoviesProps {
  genres: string[];
  currentMovieId: string;
}

export async function RelatedMovies({ genres, currentMovieId }: RelatedMoviesProps) {
  const relatedMovies = await getRelatedMovies({ genres, currentMovieId });

  if (!relatedMovies || relatedMovies.length === 0) {
    return null;
  }
  
// Get top 5 related movies, already sorted by the flow's relevance score.
  const topRelated = relatedMovies.slice(0, 5);

  return (
    <section className="mt-12">
      <h2 className="font-headline text-3xl font-bold mb-8">Related Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {topRelated.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
