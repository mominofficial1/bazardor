'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Category } from '@/types/product';
import { getCurrentBengaliDate } from '@/lib/utils/bengali';
import { useSession, signOut } from '@/lib/auth/auth-client';
import toast from 'react-hot-toast';
import { User, LogOut, Edit, ChevronDown, Menu, X } from 'lucide-react';

interface NavbarProps {
  categories: Category[];
}

export function Navbar({ categories }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const bengaliDate = getCurrentBengaliDate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('সফলভাবে সাইন আউট হয়েছে');
      setUserDropdownOpen(false);
      router.push('/');
      router.refresh();
    } catch {
      toast.error('সাইন আউট করতে সমস্যা হয়েছে');
    }
  };

  const isHomeActive = pathname === '/';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#e1e8e1] shadow-xs">
      {/* Row 1: Brand & Auth */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#05893e] rounded-lg p-1">
            <div className="relative w-11 h-11 flex-shrink-0 bg-green-50 rounded-xl p-1 border border-green-200 flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর লোগো"
                width={36}
                height={36}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold text-[#1d271f] tracking-tight flex items-center gap-1.5">
                <span>🛒</span>
                <span className="text-[#05893e]">বাজার</span>
                <span>দর</span>
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {bengaliDate}
              </span>
            </div>
          </Link>

          {/* Right: Auth Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {isPending ? (
              <div className="h-9 w-24 bg-gray-100 animate-pulse rounded-lg" />
            ) : session?.user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-200 bg-green-50/60 hover:bg-green-100/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#05893e]"
                  id="user-menu-button"
                  aria-expanded={userDropdownOpen}
                >
                  <div className="w-8 h-8 rounded-full bg-[#05893e] text-white flex items-center justify-center font-bold text-sm">
                    {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-semibold text-[#1d271f] max-w-[120px] truncate">
                    {session.user.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">লগইনকৃত ব্যবহারকারী</p>
                      <p className="text-sm font-bold text-gray-800 truncate">{session.user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-[#05893e] transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>প্রোফাইল</span>
                    </Link>
                    <Link
                      href="/profile/update"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-[#05893e] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>তথ্য আপডেট করুন</span>
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#05893e] hover:bg-green-50 rounded-lg transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-semibold text-white bg-[#05893e] hover:bg-[#047f39] rounded-lg shadow-sm hover:shadow transition-all"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-[#05893e] focus:outline-none"
              aria-label="মোবাইল মেনু খুলুন"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-gray-100 py-3 space-y-2">
            {session?.user ? (
              <>
                <div className="px-3 py-2 bg-green-50/50 rounded-lg mb-2">
                  <p className="text-sm font-bold text-gray-800">{session.user.name}</p>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                </div>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <User className="w-4 h-4" />
                  <span>প্রোফাইল</span>
                </Link>
                <Link
                  href="/profile/update"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4" />
                  <span>তথ্য আপডেট করুন</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>সাইন আউট</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-sm font-semibold text-white bg-[#05893e] rounded-lg"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Row 2: Category Navigation Row */}
      <div className="w-full border-t border-[#e1e8e1]/70 bg-[#fafcfa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav
            aria-label="ক্যাটেগরি নেভিগেশন"
            className="flex items-center gap-1.5 sm:gap-2 py-2.5 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {/* All Products link */}
            <Link
              href="/"
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                isHomeActive
                  ? 'bg-[#05893e] text-white shadow-xs'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:bg-green-50/50'
              }`}
            >
              <span>🛒</span>
              <span>সব পণ্য</span>
            </Link>

            {/* API Categories */}
            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id || cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#05893e] text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:bg-green-50/50'
                  }`}
                >
                  <span>{cat.icon || '🛍️'}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
