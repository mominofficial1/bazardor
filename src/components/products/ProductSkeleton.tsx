import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-[#e1e8e1] p-5 shadow-xs animate-pulse">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="w-14 h-14 rounded-2xl bg-gray-200" />
        <div className="w-12 h-5 rounded-full bg-gray-200" />
      </div>

      <div className="space-y-2 mb-4">
        <div className="w-3/4 h-5 bg-gray-200 rounded-md" />
        <div className="w-1/2 h-4 bg-gray-200 rounded-md" />
      </div>

      <div className="pt-3 border-t border-gray-100 flex items-end justify-between">
        <div className="space-y-1">
          <div className="w-14 h-3 bg-gray-200 rounded-md" />
          <div className="w-24 h-6 bg-gray-200 rounded-md" />
        </div>
        <div className="w-16 h-6 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
