export interface Movie {
  id: string;
  slug: string;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  runtime: number;
  poster: string;
  description: string;
  director: string;
  featured: boolean;
}
