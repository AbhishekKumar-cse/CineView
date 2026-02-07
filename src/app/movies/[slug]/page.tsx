import { getAllMovies, getMovieBySlug } from '@/lib/movies';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, User, Calendar } from 'lucide-react';
import { RelatedMovies } from '@/components/related-movies';

export const revalidate = 3600; // Revalidate at most every hour
export const dynamicParams = false;

export async function generateStaticParams() {
  const movies = getAllMovies();
  return movies.map((movie) => ({
    slug: movie.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const movie = getMovieBySlug(params.slug);

  if (!movie) {
    return {
      title: 'Movie Not Found',
    };
  }

  return {
    title: movie.title,
    description: movie.description,
    openGraph: {
      title: movie.title,
      description: movie.description,
      images: [movie.poster],
    },
  };
}

export default function MovieDetailPage({ params }: { params: { slug: string } }) {
  const movie = getMovieBySlug(params.slug);

  if (!movie) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="aspect-[2/3] relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={movie.poster}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
              data-ai-hint={`${movie.genre.join(' ')} movie poster`}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genre.map((g) => (
              <Badge key={g} variant="secondary" className="rounded-full">
                {g}
              </Badge>
            ))}
          </div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">
            {movie.title}
          </h1>
          <div className="flex items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{movie.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{movie.runtime} min</span>
            </div>
          </div>
          <p className="text-lg leading-relaxed mb-8">{movie.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-accent" />
              <div>
                <span className="text-muted-foreground">Director</span>
                <p className="font-semibold">{movie.director}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              <div>
                <span className="text-muted-foreground">Rating</span>
                <p className="font-semibold">{movie.rating.toFixed(1)} / 10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedMovies genres={movie.genre} currentMovieId={movie.id} />
    </div>
  );
}
