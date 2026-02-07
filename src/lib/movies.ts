import type { Movie } from '@/types/movie';
import moviesData from '@/data/movies.json';

const movies: Movie[] = moviesData as Movie[];

export function getAllMovies(): Movie[] {
  return movies;
}

export function getFilteredMovies({
  genre,
  sort,
  search,
}: {
  genre?: string;
  sort?: string;
  search?: string;
}): Movie[] {
  let filteredMovies = [...movies];

  if (search) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (genre) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
  }

  if (sort) {
    switch (sort) {
      case 'rating_desc':
        filteredMovies.sort((a, b) => b.rating - a.rating);
        break;
      case 'year_desc':
        filteredMovies.sort((a, b) => b.year - a.year);
        break;
      case 'year_asc':
        filteredMovies.sort((a, b) => a.year - b.year);
        break;
    }
  } else {
    // Default sort: newest first
    filteredMovies.sort((a, b) => b.year - a.year);
  }

  return filteredMovies;
}

export function getMovieBySlug(slug: string): Movie | undefined {
  return movies.find((movie) => movie.slug === slug);
}

export function getFeaturedMovies(): Movie[] {
  return movies.filter((movie) => movie.featured).slice(0, 5);
}

export function getGenres(): string[] {
  const allGenres = movies.flatMap((movie) => movie.genre);
  return [...new Set(allGenres)].sort();
}

export function getMoviesByGenre(genre: string): Movie[] {
  return movies
    .filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )
    .sort((a, b) => b.rating - a.rating);
}
