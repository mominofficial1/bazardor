import React from 'react';
import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-[#e1e8e1] shadow-xs">
        <div className="w-20 h-20 bg-green-50 text-[#05893e] rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-inner">
          🛒
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-[#05893e]">৪০৪</span>
          <h1 className="text-2xl font-bold text-[#1d271f]">
            পৃষ্ঠা খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
            আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা মুছে ফেলা হয়েছে।
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-bold text-sm shadow-sm hover:shadow transition-all"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
