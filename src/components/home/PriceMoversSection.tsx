import React from 'react';
import { Product } from '@/types/product';
import { ProductCard } from '@/components/products/ProductCard';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceMoversSectionProps {
  products: Product[];
}

export function PriceMoversSection({ products }: PriceMoversSectionProps) {
  // Section A: Top 6 Risers (Positive changes)
  const risingProducts = products
    .filter((p) => p.change && (p.change.dir === 'up' || p.change.pct > 0))
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  // Section B: Top 6 Fallers (Negative changes)
  const fallingProducts = products
    .filter((p) => p.change && (p.change.dir === 'down' || p.change.pct < 0))
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Section A: আজ দাম বেড়েছে ▲ */}
      {risingProducts.length > 0 && (
        <section aria-labelledby="rising-products-title">
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-green-100 text-[#05893e] flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="rising-products-title"
                className="text-xl sm:text-2xl font-bold text-[#1d271f] flex items-center gap-2"
              >
                <span>আজ দাম বেড়েছে</span>
                <span className="text-[#05893e] text-lg font-extrabold">▲</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                গতকালের তুলনায় যেসব পণ্যের দাম বৃদ্ধি পেয়েছে
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {risingProducts.map((product) => (
              <ProductCard key={`rising-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section B: আজ দাম কমেছে ▼ */}
      {fallingProducts.length > 0 && (
        <section aria-labelledby="falling-products-title">
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-[#d03739] flex items-center justify-center">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <h2
                id="falling-products-title"
                className="text-xl sm:text-2xl font-bold text-[#1d271f] flex items-center gap-2"
              >
                <span>আজ দাম কমেছে</span>
                <span className="text-[#d03739] text-lg font-extrabold">▼</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                গতকালের তুলনায় যেসব পণ্যের দাম হ্রাস পেয়েছে
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {fallingProducts.map((product) => (
              <ProductCard key={`falling-${product.id}`} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
