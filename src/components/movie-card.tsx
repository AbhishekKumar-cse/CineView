import Link from 'next/link';
import Image from 'next/image';
import type { Movie } from '@/types/movie';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.slug}`} className="group block">
      <Card className="overflow-hidden rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-accent/20">
        <CardContent className="p-0">
          <div className="aspect-[2/3] relative">
            <Image
              src={movie.poster}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              priority={movie.featured}
              data-ai-hint={`${movie.genre.join(' ')} movie poster`}
            />
          </div>
        </CardContent>
      </Card>
      <div className="mt-2">
        <h3 className="font-semibold truncate group-hover:text-accent">{movie.title}</h3>
        <div className="flex justify-between text-sm text-muted-foreground">
          <p>{movie.year}</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span>{movie.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
