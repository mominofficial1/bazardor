'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema, UpdateProfileInput } from '@/lib/validations/auth';
import { useSession, authClient } from '@/lib/auth/auth-client';
import toast from 'react-hot-toast';
import { User, ArrowLeft, Loader2, Save } from 'lucide-react';

export default function ProfileUpdatePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
  });

  // Prefill form with current user's name
  useEffect(() => {
    if (!isPending) {
      if (!session?.user) {
        toast.error('তথ্য আপডেট করতে অনুগ্রহ করে সাইন ইন করুন');
        router.push('/signin?redirect=/profile/update');
      } else if (session.user.name) {
        setValue('name', session.user.name);
      }
    }
  }, [session, isPending, router, setValue]);

  const onSubmit = async (data: UpdateProfileInput) => {
    setIsSubmitting(true);
    try {
      // Challenge C3: Update user information using Better Auth API
      const res = await authClient.updateUser({
        name: data.name,
      });

      if (res.error) {
        toast.error(res.error.message || 'তথ্য আপডেট করতে সমস্যা হয়েছে');
      } else {
        toast.success('আপনার নাম সফলভাবে আপডেট করা হয়েছে!');
        router.push('/profile');
        router.refresh();
      }
    } catch {
      toast.error('তথ্য আপডেট করতে সমস্যা হয়েছে, আবার চেষ্টা করুন');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending || !session?.user) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-[#05893e] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 text-sm font-medium">ব্যবহারকারী তথ্য যাচাই করা হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-16 space-y-6">
      {/* Back button */}
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#05893e] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>প্রোফাইলে ফিরে যান</span>
        </Link>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl border border-[#e1e8e1] p-6 sm:p-8 shadow-xs">
        <div className="text-center space-y-1 mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d271f]">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচের তথ্য আপডেট করুন
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email (Readonly reference) */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              ইমেইল ঠিকানা (পরিবর্তনযোগ্য নয়)
            </label>
            <input
              type="text"
              value={session.user.email || ''}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-100 text-gray-500 text-sm cursor-not-allowed"
            />
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              আপনার পুরো নাম
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                {...register('name')}
                placeholder="নতুন নাম লিখুন"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#05893e] ${
                  errors.name ? 'border-red-400 bg-red-50/20' : 'border-gray-200 bg-gray-50/30'
                }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-600 mt-1 font-medium">{errors.name.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-xl bg-[#05893e] hover:bg-[#047f39] text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              id="profile-update-submit-button"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>সংরক্ষণ করা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>তথ্য আপডেট করুন</span>
                </>
              )}
            </button>
            <Link
              href="/profile"
              className="px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold text-sm transition-colors"
            >
              বাতিল
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
