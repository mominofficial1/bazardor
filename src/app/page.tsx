import React from 'react';
import { Hero } from '@/components/home/Hero';
import { PriceMoversSection } from '@/components/home/PriceMoversSection';
import { ProductGrid } from '@/components/products/ProductGrid';
import { getProducts } from '@/lib/api/bazardor';
import { ShoppingBag } from 'lucide-react';

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* Main Content Sections */}
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14 space-y-14 sm:space-y-20">
        {/* 2. Section A (আজ দাম বেড়েছে ▲) & Section B (আজ দাম কমেছে ▼) */}
        <PriceMoversSection products={products} />

        {/* 3. Section C: সব পণ্য */}
        <section id="সব-পণ্য" className="scroll-mt-36" aria-labelledby="all-products-title">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-3 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 text-[#05893e] mb-1">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">সম্পূর্ণ বাজার তালিকা</span>
              </div>
              <h2
                id="all-products-title"
                className="text-2xl sm:text-3xl font-extrabold text-[#1d271f]"
              >
                সব পণ্য
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                আজকের বাজারের সকল নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ হালনাগাদ দর
              </p>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              মোট পণ্য: <span className="text-[#05893e] font-bold">{products.length}টি</span>
            </div>
          </div>

          {/* Product Grid */}
          <ProductGrid products={products} />
        </section>
      </div>
    </div>
  );
}
