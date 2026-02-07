'use server';

/**
 * @fileOverview Provides functionality to recommend related movies based on shared genres and ratings.
 *
 * - `getRelatedMovies`: Asynchronous function to fetch related movies.
 * - `RelatedMoviesInput`: Interface defining the input schema for the related movies flow.
 * - `RelatedMoviesOutput`: Interface defining the output schema for the related movies flow.
 */

import {ai} from '@/ai/genkit';
import {Movie} from '@/types/movie';
import {z} from 'genkit';

const RelatedMoviesInputSchema = z.object({
  genres: z.array(z.string()).describe('The genres of the current movie.'),
  currentMovieId: z.string().describe('The ID of the current movie to exclude from recommendations.'),
});
export type RelatedMoviesInput = z.infer<typeof RelatedMoviesInputSchema>;

const RelatedMoviesOutputSchema = z.array(z.any());
export type RelatedMoviesOutput = z.infer<typeof RelatedMoviesOutputSchema>;


export async function getRelatedMovies(input: RelatedMoviesInput): Promise<Movie[]> {
  return relatedMoviesFlow(input);
}

const relatedMoviesPrompt = ai.definePrompt({
  name: 'relatedMoviesPrompt',
  input: {schema: RelatedMoviesInputSchema},
  output: {schema: RelatedMoviesOutputSchema},
  prompt: `You are a movie expert. Given a list of genres, you will find other movies that share those genres, prioritizing those with more shared genres and higher ratings. Only return the movie objects. Do not return any other text.

Genres: {{genres}}`,
});

const relatedMoviesFlow = ai.defineFlow(
  {
    name: 'relatedMoviesFlow',
    inputSchema: RelatedMoviesInputSchema,
    outputSchema: RelatedMoviesOutputSchema,
  },
  async input => {
    const {getAllMovies} = await import('@/lib/movies');
    const allMovies = getAllMovies();

    // Calculate a "relatedness" score for each movie.
    const scoredMovies = allMovies
      .filter(movie => movie.id !== input.currentMovieId)
      .map(movie => {
        const sharedGenres = movie.genre.filter(g => input.genres.includes(g));
        
        if (sharedGenres.length === 0) {
          return null; // Exclude movies with no shared genres.
        }

        // Score: higher for more shared genres, with rating as a tie-breaker.
        const score = (sharedGenres.length * 10) + movie.rating;

        return { ...movie, score };
      })
      .filter(Boolean) as (Movie & { score: number })[]; // Filter out nulls and assert type

    // Sort by score in descending order
    scoredMovies.sort((a, b) => b.score - a.score);

    return scoredMovies as any;
  }
);
