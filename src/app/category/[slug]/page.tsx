import React from 'react';
import { Metadata } from 'next';
import { getCategory, getProducts } from '@/lib/api/bazardor';
import { CategoryView } from '@/components/category/CategoryView';
import Link from 'next/link';
import { Home } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'ক্যাটেগরি পাওয়া যায়নি | বাজার দর',
    };
  }

  return {
    title: `${category.nameBn} এর বাজারদর | বাজার দর (BazarDor)`,
    description: `${category.nameBn} ক্যাটেগরির সকল নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর।`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  if (!category) {
    return (
      <div className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-[#e1e8e1]">
          <div className="w-16 h-16 bg-red-50 text-[#d03739] rounded-2xl flex items-center justify-center mx-auto text-3xl">
            ⚠️
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1d271f]">ক্যাটেগরি খুঁজে পাওয়া যায়নি</h1>
            <p className="text-sm text-gray-500 mt-2">
              অনুরোধকৃত &quot;{slug}&quot; ক্যাটেগরিটি আমাদের তালিকায় নেই।
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-bold text-sm shadow-sm transition-all"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  return <CategoryView category={category} initialProducts={products} />;
}
