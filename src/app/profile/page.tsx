'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth/auth-client';
import toast from 'react-hot-toast';
import { User, Mail, Calendar, Edit, LogOut, ArrowLeft, ShieldCheck } from 'lucide-react';
import { getCurrentBengaliDate } from '@/lib/utils/bengali';

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error('প্রোফাইল দেখতে অনুগ্রহ করে প্রথমে সাইন ইন করুন');
      router.push('/signin?redirect=/profile');
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('সফলভাবে সাইন আউট হয়েছে');
      router.push('/');
      router.refresh();
    } catch {
      toast.error('সাইন আউট করতে সমস্যা হয়েছে');
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-[#05893e] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 text-sm font-medium">প্রোফাইল তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  const user = session.user;
  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#05893e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-[#e1e8e1] overflow-hidden shadow-xs">
        {/* Cover gradient */}
        <div className="h-32 bg-gradient-to-r from-green-600 via-[#05893e] to-emerald-700 relative">
          <div className="absolute -bottom-12 left-6 sm:left-8">
            <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-md">
              <div className="w-full h-full rounded-xl bg-[#05893e] text-white flex items-center justify-center font-extrabold text-3xl shadow-inner">
                {initial}
              </div>
            </div>
          </div>
        </div>

        {/* Info Body */}
        <div className="pt-16 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d271f]">
                {user.name}
              </h1>
              <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>{user.email}</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/profile/update"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-bold text-sm shadow-xs transition-all"
                id="profile-update-button"
              >
                <Edit className="w-4 h-4" />
                <span>তথ্য আপডেট করুন</span>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold text-sm transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>সাইন আউট</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                অ্যাকাউন্ট স্ট্যাটাস
              </span>
              <div className="flex items-center gap-2 mt-1.5 text-sm font-bold text-green-700">
                <ShieldCheck className="w-4 h-4 text-[#05893e]" />
                <span>সক্রিয় (Active Member)</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
                আজকের তারিখ
              </span>
              <div className="flex items-center gap-2 mt-1.5 text-sm font-bold text-gray-700">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{getCurrentBengaliDate()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
