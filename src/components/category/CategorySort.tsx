'use client';

import React from 'react';
import { SortOption } from '@/types/product';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

interface CategorySortProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function CategorySort({ currentSort, onSortChange }: CategorySortProps) {
  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3.5 py-2 shadow-xs hover:border-[#05893e] transition-colors">
        <ArrowUpDown className="w-4 h-4 text-gray-500" />
        <span className="text-xs sm:text-sm font-semibold text-gray-700">সাজান:</span>
        <select
          value={currentSort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="appearance-none bg-transparent pr-6 text-xs sm:text-sm font-bold text-[#05893e] focus:outline-none cursor-pointer"
          aria-label="পণ্য সাজান"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-asc">দাম: কম থেকে বেশি</option>
          <option value="price-desc">দাম: বেশি থেকে কম</option>
        </select>
        <ChevronDown className="w-4 h-4 text-gray-400 pointer-events-none -ml-4" />
      </div>
    </div>
  );
}
