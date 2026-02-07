import Link from 'next/link';
import { Film } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Film className="h-6 w-6 text-accent" />
          <span className="hidden font-bold sm:inline-block font-headline">
            CineView
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/movies"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Movies
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
