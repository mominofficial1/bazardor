'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const handleScrollToAllProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('সব-পণ্য');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f0f5f0] to-[#fafcfa] border-b border-[#e1e8e1]/60 py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & CTA */}
          <div className="md:col-span-7 flex flex-col items-start text-left space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100/80 border border-green-200 text-[#05893e] text-xs sm:text-sm font-semibold">
              <span>🌾</span>
              <span>প্রতিদিনের বাজারের সহজ হিসাব</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1d271f] tracking-tight leading-tight">
              আজকের বাজার দর, <br className="hidden sm:inline" />
              <span className="text-[#05893e]">এক নজরে</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
              চাল, ডাল, সবজি, মাছ ও নিত্যপ্রয়োজনীয় পণ্যের দাম সহজেই দেখুন। সঠিক দাম জানুন এবং সচেতনভাবে কেনাকাটা করুন।
            </p>

            <div className="pt-2">
              <a
                href="#সব-পণ্য"
                onClick={handleScrollToAllProducts}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#05893e] focus:ring-offset-2"
                id="hero-cta-button"
              >
                <span>সব পণ্যের দাম দেখুন</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>
            </div>
          </div>

          {/* Right Column: Fruit Basket Illustration */}
          <div className="md:col-span-5 flex justify-center items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 flex items-center justify-center">
              <div className="absolute inset-0 bg-green-200/30 rounded-full blur-3xl transform scale-90" />
              <Image
                src="/bazar-hero.png"
                alt="বাজারের ফলের ঝুড়ি"
                width={380}
                height={380}
                className="relative object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
