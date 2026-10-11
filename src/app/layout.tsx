import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { PriceTicker } from '@/components/layout/PriceTicker';
import { Footer } from '@/components/layout/Footer';
import { ToasterProvider } from '@/components/ui/ToasterProvider';
import { getCategories, getProducts } from '@/lib/api/bazardor';

const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'বাজার দর (BazarDor) — প্রয়োজনীয় পণ্যের দাম এক নজরে',
  description: 'দৈনন্দিন বাজারের চাল, ডাল, তেল, সবজি, মাছ ও নিত্যপ্রয়োজনীয় পণ্যের হালনাগাদ বাজারদর এবং দামের হ্রাস-বৃদ্ধি এক নজরে দেখুন।',
  icons: {
    icon: '/logo-icon.png',
  },
  openGraph: {
    title: 'বাজার দর (BazarDor) — প্রয়োজনীয় পণ্যের দাম এক নজরে',
    description: 'নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য বাজারদর ড্যাশবোর্ড।',
    locale: 'bn_BD',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <html lang="bn" className={hindSiliguri.variable}>
      <body className="min-h-screen flex flex-col bg-[#fafcfa] text-[#1d271f] antialiased">
        <ToasterProvider />
        <Navbar categories={categories} />
        <PriceTicker products={products} />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
