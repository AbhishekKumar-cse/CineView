import { getGenres, getAllMovies } from '@/lib/movies';
import { MetadataRoute } from 'next';

const URL = 'http://localhost:9002';

export default function sitemap(): MetadataRoute.Sitemap {
  const movies = getAllMovies();
  const genres = getGenres();

  const movieEntries: MetadataRoute.Sitemap = movies.map((movie) => ({
    url: `${URL}/movies/${movie.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const genreEntries: MetadataRoute.Sitemap = genres.map((genre) => ({
    url: `${URL}/genre/${genre.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${URL}/movies`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...movieEntries,
    ...genreEntries,
  ];
}
