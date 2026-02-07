'use server';

/**
 * @fileOverview Provides functionality to recommend related movies based on shared genres.
 *
 * - `getRelatedMovies`: Asynchronous function to fetch related movies based on input movie genres.
 * - `RelatedMoviesInput`: Interface defining the input schema for the related movies flow, expecting an array of genres.
 * - `RelatedMoviesOutput`: Interface defining the output schema for the related movies flow, which is an array of movie objects.
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
  prompt: `You are a movie expert. Given a list of genres, you will find other movies that share those genres. Only return the movie objects. Do not return any other text.

Genres: {{genres}}`,
});

const relatedMoviesFlow = ai.defineFlow(
  {
    name: 'relatedMoviesFlow',
    inputSchema: RelatedMoviesInputSchema,
    outputSchema: RelatedMoviesOutputSchema,
  },
  async input => {
    // Assuming moviesData is available here or can be imported
    const {getAllMovies} = await import('@/lib/movies');
    const allMovies = getAllMovies();

    // Filter movies based on the provided genres
    const relatedMovies = allMovies.filter(movie => {
      // Ensure the movie is not the current movie and has at least one genre in common
      return movie.id !== input.currentMovieId && input.genres.some(genre => movie.genre.includes(genre));
    });

    return relatedMovies as any; // Cast to 'any' to satisfy Genkit's type system, refine if needed
  }
);
