import React from 'react';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { headers } from 'next/headers';
import { getProduct } from '@/lib/api/bazardor';
import { auth } from '@/lib/auth/auth';
import {
  formatBengaliCurrency,
  formatBengaliPercent,
  formatBengaliUnit,
  getProductEmoji,
  toBengaliDigits,
} from '@/lib/utils/bengali';
import { ArrowLeft, Store, MapPin, TrendingUp, TrendingDown, ShieldAlert } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'পণ্য পাওয়া যায়নি | বাজার দর',
    };
  }

  return {
    title: `${product.nameBn} এর বাজারদর ও বিস্তারিত | বাজার দর (BazarDor)`,
    description: `${product.nameBn} এর আজকের বাজারদর, বিভিন্ন বাজারের সর্বনিম্ন, সর্বোচ্চ এবং গড় দর।`,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // 1. Check Authentication on Server
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) {
    redirect(`/signin?redirect=${encodeURIComponent(`/product/${slug}`)}&auth_required=1`);
  }

  // 2. Fetch Product Data
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const emoji = getProductEmoji(product.nameBn, product.category, product.image);
  const formattedPrice = formatBengaliCurrency(product.today);
  const formattedUnit = formatBengaliUnit(product.unit);
  const change = product.change;
  const isUp = change && (change.dir === 'up' || change.pct > 0);
  const isDown = change && (change.dir === 'down' || change.pct < 0);

  // 3. Calculate Price Summary (Min, Max, Average)
  const markets = product.markets || [];
  let minPrice = product.today;
  let maxPrice = product.today;
  let avgPrice = product.today;

  if (markets.length > 0) {
    minPrice = Math.min(...markets.map((m) => m.min));
    maxPrice = Math.max(...markets.map((m) => m.max));
    const total = markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0);
    avgPrice = Math.round(total / markets.length);
  }

  return (
    <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-10">
      {/* Back button & Breadcrumb */}
      <div>
        <Link
          href={product.category ? `/category/${product.category}` : '/'}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#05893e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>পূর্ববর্তী পৃষ্ঠায় ফিরে যান</span>
        </Link>
      </div>

      {/* Top Section: Product Summary Card */}
      <div className="bg-white rounded-3xl border border-[#e1e8e1] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#f0f5f0] border border-green-200 flex items-center justify-center text-5xl sm:text-6xl shadow-inner">
              {emoji}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                {product.categoryNameBn && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-50 border border-green-200 text-[#05893e]">
                    {product.categoryNameBn}
                  </span>
                )}
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">
                  {formattedUnit}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1d271f]">
                {product.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500">
                {product.description || 'আজকের কাঁচাবাজারের নির্ভরযোগ্য ও হালনাগাদ দর'}
              </p>
            </div>
          </div>

          {/* Current Price Box */}
          <div className="w-full sm:w-auto bg-[#fafcfa] border border-[#e1e8e1] rounded-2xl p-4 sm:p-5 text-left sm:text-right flex sm:flex-col justify-between sm:justify-center items-center sm:items-end">
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                আজকের নির্ধারিত দর
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#05893e]">
                {formattedPrice}
              </span>
            </div>
            {change && (
              <div
                className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg mt-2 ${
                  isUp
                    ? 'text-[#05893e] bg-green-100'
                    : isDown
                    ? 'text-[#d03739] bg-red-100'
                    : 'text-gray-500 bg-gray-100'
                }`}
              >
                <span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
                <span>{formatBengaliPercent(change.pct)}</span>
                <span className="text-[11px] font-normal text-gray-500 ml-1">
                  ({isUp ? 'বৃদ্ধি' : isDown ? 'হ্রাস' : 'অপরিবর্তিত'})
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Metric Cards: Minimum, Maximum, Average */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-[#1d271f] mb-4">
          মূল্য বিশ্লেষণ (Price Summary)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* 1. Minimum Price */}
          <div className="bg-white rounded-2xl border border-[#e1e8e1] p-5 shadow-xs">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              সর্বনিম্ন দাম (Min Price)
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-green-700">
                {formatBengaliCurrency(minPrice)}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">বিভিন্ন বাজারের সর্বনিম্ন হার</p>
          </div>

          {/* 2. Average Price */}
          <div className="bg-white rounded-2xl border border-[#e1e8e1] p-5 shadow-xs">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              গড় দাম (Average Price)
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#05893e]">
                {formatBengaliCurrency(avgPrice)}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">বাজারসমূহের মধ্যকার গড় দর</p>
          </div>

          {/* 3. Maximum Price */}
          <div className="bg-white rounded-2xl border border-[#e1e8e1] p-5 shadow-xs">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              সর্বোচ্চ দাম (Max Price)
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-700">
                {formatBengaliCurrency(maxPrice)}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">বিভিন্ন বাজারের সর্বোচ্চ দর</p>
          </div>
        </div>
      </div>

      {/* Section: বাজারভিত্তিক আজকের দাম */}
      <section aria-labelledby="markets-table-title" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-green-50 text-[#05893e] flex items-center justify-center">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <h2 id="markets-table-title" className="text-lg sm:text-xl font-bold text-[#1d271f]">
                বাজারভিত্তিক আজকের দাম
              </h2>
              <p className="text-xs text-gray-500">
                দেশের প্রধান প্রধান বাজারগুলোর বর্তমান দর তালিকা
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
            {toBengaliDigits(markets.length)}টি বাজার
          </span>
        </div>

        {markets.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-gray-200 text-gray-500 text-sm">
            এই পণ্যের জন্য আলাদা বাজারভিত্তিক তালিকা এখনো যুক্ত হয়নি।
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#e1e8e1] overflow-hidden shadow-xs">
            {/* Desktop & Tablet Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f0f5f0] text-gray-700 text-xs sm:text-sm font-bold border-b border-[#e1e8e1]">
                    <th className="py-3.5 px-4 sm:px-6">বাজারের নাম</th>
                    <th className="py-3.5 px-4 sm:px-6">বিভাগ</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">দর পরিসীমা (Min - Max)</th>
                    <th className="py-3.5 px-4 sm:px-6 text-center">একক</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                  {markets.map((m, index) => (
                    <tr
                      key={`${m.market}-${index}`}
                      className="hover:bg-green-50/40 transition-colors"
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#1d271f] flex items-center gap-2">
                        <Store className="w-4 h-4 text-gray-400" />
                        <span>{m.market}</span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-gray-600">
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          {m.division || 'বাংলাদেশ'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-[#05893e]">
                        {formatBengaliCurrency(m.min)} — {formatBengaliCurrency(m.max)}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-center text-gray-500 font-medium">
                        {formattedUnit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
