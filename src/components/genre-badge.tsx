import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface GenreBadgeProps {
  genre: string;
}

export function GenreBadge({ genre }: GenreBadgeProps) {
  return (
    <Link href={`/genre/${genre.toLowerCase()}`}>
      <Badge
        variant="outline"
        className="rounded-full px-4 py-1 text-sm transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105"
      >
        {genre}
      </Badge>
    </Link>
  );
}
