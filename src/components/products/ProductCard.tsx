import React from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import {
  formatBengaliCurrency,
  formatBengaliPercent,
  formatBengaliUnit,
  getProductEmoji,
} from '@/lib/utils/bengali';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const emoji = getProductEmoji(product.nameBn, product.category, product.image);
  const formattedPrice = formatBengaliCurrency(product.today);
  const formattedUnit = formatBengaliUnit(product.unit);
  const change = product.change;

  const isUp = change && (change.dir === 'up' || change.pct > 0);
  const isDown = change && (change.dir === 'down' || change.pct < 0);
  const isFlat = !change || change.dir === 'flat' || change.pct === 0;

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="group flex flex-col bg-white rounded-2xl border border-[#e1e8e1] p-5 shadow-xs hover:shadow-md hover:border-[#05893e]/40 transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#05893e] focus:ring-offset-2"
      id={`product-card-${product.id}`}
    >
      {/* Top: Emoji Icon & Category Tag */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="w-14 h-14 rounded-2xl bg-[#f0f5f0] flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-200">
          {emoji}
        </div>
        {product.categoryNameBn && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {product.categoryNameBn}
          </span>
        )}
      </div>

      {/* Middle: Title & Unit */}
      <div className="flex-1 min-h-[48px] flex flex-col justify-start">
        <h3 className="text-base sm:text-lg font-bold text-[#1d271f] group-hover:text-[#05893e] transition-colors line-clamp-1">
          {product.nameBn}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
          {formattedUnit}
        </p>
      </div>

      {/* Bottom: Price Row */}
      <div className="pt-3 border-t border-gray-100 mt-3 flex items-end justify-between gap-2">
        <div>
          <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            আজকের দাম
          </span>
          <span className="text-lg sm:text-xl font-extrabold text-[#1d271f]">
            {formattedPrice}
          </span>
        </div>

        {/* Price Change Badge */}
        {change && (
          <div
            className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
              isUp
                ? 'text-[#05893e] bg-green-50 border border-green-200'
                : isDown
                ? 'text-[#d03739] bg-red-50 border border-red-200'
                : 'text-gray-500 bg-gray-50 border border-gray-200'
            }`}
          >
            <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
            <span>{formatBengaliPercent(change.pct)}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
