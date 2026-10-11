import React from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = 'কোনো পণ্য পাওয়া যায়নি',
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="w-full py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-gray-500 font-medium text-base">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id || product.slug} product={product} />
      ))}
    </div>
  );
}
