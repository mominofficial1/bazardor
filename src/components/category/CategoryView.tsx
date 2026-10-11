'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Category, Product, SortOption } from '@/types/product';
import { ProductCard } from '@/components/products/ProductCard';
import { CategorySort } from './CategorySort';
import { parseNumericPrice, toBengaliDigits } from '@/lib/utils/bengali';
import { Home, ArrowLeft } from 'lucide-react';

interface CategoryViewProps {
  category: Category;
  initialProducts: Product[];
}

export function CategoryView({ category, initialProducts }: CategoryViewProps) {
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Bengali-aware numeric price sorting
  const sortedProducts = useMemo(() => {
    if (!initialProducts || initialProducts.length === 0) return [];
    const list = [...initialProducts];

    if (sortOption === 'price-asc') {
      return list.sort((a, b) => parseNumericPrice(a.today) - parseNumericPrice(b.today));
    }
    if (sortOption === 'price-desc') {
      return list.sort((a, b) => parseNumericPrice(b.today) - parseNumericPrice(a.today));
    }
    return list; // default order
  }, [initialProducts, sortOption]);

  if (!category || initialProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-50 text-[#05893e] rounded-3xl flex items-center justify-center mx-auto text-4xl mb-4">
          🛒
        </div>
        <h1 className="text-2xl font-bold text-[#1d271f] mb-2">এই ক্যাটেগরিতে কোনো পণ্য পাওয়া যায়নি</h1>
        <p className="text-gray-500 text-sm mb-6">অনুগ্রহ করে অন্য কোনো ক্যাটেগরি নির্বাচন করুন অথবা হোম পেজে ফিরে যান।</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-bold text-sm shadow-sm transition-all"
        >
          <Home className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Back button & Breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#05893e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>সব পণ্যে ফিরে যান</span>
        </Link>
      </div>

      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center text-3xl shadow-xs">
            {category.icon || '🛍️'}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d271f]">
              {category.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              মোট পণ্য: <span className="text-[#05893e] font-bold">{toBengaliDigits(initialProducts.length)}টি</span>
            </p>
          </div>
        </div>

        {/* Sorting Dropdown */}
        <div>
          <CategorySort currentSort={sortOption} onSortChange={setSortOption} />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id || product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
