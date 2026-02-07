'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getSortLabel } from '@/lib/utils';

export function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || 'year_desc';

  const handleSortChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('sort', value);

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`/movies${query}`);
  };

  return (
    <Select value={sort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by">{getSortLabel(sort)}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="rating_desc">Rating: High to Low</SelectItem>
        <SelectItem value="year_desc">Year: Newest First</SelectItem>
        <SelectItem value="year_asc">Year: Oldest First</SelectItem>
      </SelectContent>
    </Select>
  );
}
