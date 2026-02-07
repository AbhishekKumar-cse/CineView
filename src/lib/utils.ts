import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSortLabel = (sortKey?: string): string => {
  switch (sortKey) {
    case 'rating_desc':
      return 'Rating: High to Low';
    case 'year_desc':
      return 'Year: Newest First';
    case 'year_asc':
      return 'Year: Oldest First';
    default:
      return 'Sort by';
  }
};
