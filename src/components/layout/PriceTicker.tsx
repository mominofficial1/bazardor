'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import {
  formatBengaliCurrency,
  formatBengaliPercent,
  formatBengaliUnit,
  getProductEmoji,
} from '@/lib/utils/bengali';

interface PriceTickerProps {
  products: Product[];
}

export function PriceTicker({ products }: PriceTickerProps) {
  if (!products || products.length === 0) return null;

  // Duplicate list once to allow infinite seamless marquee scroll
  const marqueeItems = [...products, ...products];

  return (
    <div className="w-full bg-[#f0f5f0] border-y border-[#e1e8e1] overflow-hidden select-none py-2">
      <div className="ticker-wrapper relative w-full overflow-hidden flex">
        <div className="ticker-track flex whitespace-nowrap will-change-transform hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {marqueeItems.map((product, idx) => {
            const emoji = getProductEmoji(product.nameBn, product.category, product.image);
            const price = formatBengaliCurrency(product.today);
            const unit = formatBengaliUnit(product.unit);
            const change = product.change;
            const isUp = change && (change.dir === 'up' || change.pct > 0);
            const isDown = change && (change.dir === 'down' || change.pct < 0);

            return (
              <Link
                key={`${product.id}-${idx}`}
                href={`/product/${product.slug || product.id}`}
                className="inline-flex items-center gap-2 mx-4 text-xs sm:text-sm font-medium text-[#1d271f] hover:text-[#05893e] transition-colors"
              >
                <span className="text-base">{emoji}</span>
                <span className="font-semibold">{product.nameBn}</span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-700 font-medium">
                  {price} / {unit.replace('প্রতি ', '')}
                </span>
                {change && change.pct !== 0 && (
                  <span
                    className={`inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded ${
                      isUp
                        ? 'text-[#05893e] bg-green-100'
                        : isDown
                        ? 'text-[#d03739] bg-red-100'
                        : 'text-gray-500 bg-gray-100'
                    }`}
                  >
                    <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
                    <span>{formatBengaliPercent(change.pct)}</span>
                  </span>
                )}
                <span className="text-gray-300 ml-2">|</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
