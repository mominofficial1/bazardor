# 🛒 বাজার দর (BazarDor) — প্রয়োজনীয় পণ্যের দাম এক নজরে

> **প্রয়োজনীয় পণ্যের দাম এক নজরে।**  
> দৈনন্দিন কাঁচাবাজারের চাল, ডাল, তেল, সবজি, মাছ, মাংস ও নিত্যপ্রয়োজনীয় দ্রব্যাদির সর্বশেষ ও নির্ভরযোগ্য বাজারদর পর্যবেক্ষণ ড্যাশবোর্ড।

---

## 📖 প্রকল্প পরিচিতি (Project Overview)

**বাজার দর (BazarDor)** হলো একটি আধুনিক, দৃষ্টিনন্দন ও প্রতিক্রিয়াশীল (Responsive) ওয়েব প্ল্যাটফর্ম—যা বাংলাদেশের সাধারণ ক্রেতা ও বাজার পর্যবেক্ষণকারীদের জন্য প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য দর এক নজরে উপস্থাপন করে। এখানে পণ্যভিত্তিক আজকের দর, গতকালের তুলনায় দামের তারতম্য (বৃদ্ধি/হ্রাস), দেশের বিভিন্ন বাজারের সর্বনিম্ন ও সর্বোচ্চ দর বিশ্লেষণ এবং ক্যাটেগরিভিত্তিক অনুসন্ধান করা যায়।

---

## 🛠️ ব্যবহৃত প্রযুক্তিসমূহ (Technologies Used)

- **Frontend & Framework:** [Next.js 15 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI 4](https://daisyui.com/)
- **Font & Typography:** Hind Siliguri (Google Fonts)
- **Authentication:** [Better Auth](https://better-auth.com/) (Email & Password, Social OAuth)
- **Database:** PostgreSQL (Neon Serverless) & SQLite (via `@libsql/client` / `better-sqlite3`)
- **API Data Source:** BazarDor REST API (Programming Hero Open API with automatic multi-mirror fallbacks)
- **Form Management & Validation:** React Hook Form + Zod
- **Notifications:** React Hot Toast
- **Icons:** Lucide React
- **Deployment & Hosting:** Vercel

---

## ✨ প্রধান ৫টি বৈশিষ্ট্য (Key Features)

1. **রিয়েলটাইম এপিআই ও মাল্টি-মিরর ফলব্যাক (Live API with Fallback System):**  
   অফিশিয়াল বাজারদর এপিআই থেকে সরাসরি লাইভ পণ্য ও ক্যাটেগরি ডেটা লোড করে। কোনো এপিআই সার্ভার সাময়িক অফলাইন হলে স্বয়ংক্রিয়ভাবে ব্যাকআপ মিরর থেকে ডেটা সংগ্রহ করে।

2. **বাংলা সংখ্যা ও মুদ্রা ফরম্যাটিং (Bengali Numeral & Currency Engine):**  
   ইংরেজি সংখ্যাকে খাঁটি বাংলা সংখ্যা (০-৯), আন্তর্জাতিক বাংলা মুদ্রা ফরম্যাট (`১৪৮ টাকা`, `১,৮৫০ টাকা`) এবং শতকরা হারে (`▲ ২.১%`, `▼ ২.৯%`) নিখুঁতভাবে রূপান্তর করে।

3. **চলমান মূল্য স্ক্রলার (Smooth Price Ticker Marquee):**  
   ওয়েবসাইটের হেডারের নিচে নিরবচ্ছিন্ন স্ক্রলিং অ্যানিমেশনের মাধ্যমে ট্রেন্ডিং পণ্যের দাম ও শতকরা পরিবর্তন প্রদর্শন করে। মাউস হোভার করলে অ্যানিমেশন থামে এবং Reduced Motion ব্যবহারকারীদের সমর্থন করে।

4. **বাংলা সংখ্যা অনুসারী গাণিতিক সর্টিং — Challenge C1 (Numeric Price Sorting):**  
   ক্যাটেগরি পেজে `সাজান: ডিফল্ট | দাম: কম থেকে বেশি | দাম: বেশি থেকে কম` ড্রপডাউনের মাধ্যমে বাংলা সংখ্যার স্ট্রিং নয়, বরং প্রকৃত সাংখ্যিক মানের ভিত্তিতে নিখুঁত সর্টিং করা হয়।

5. **নিরাপদ অথেনটিকেশন ও প্রোফাইল ব্যবস্থাপনা — Challenge C3 (Better Auth & Profile Update):**  
   Better Auth দিয়ে ইমেইল/পাসওয়ার্ড ও সোশ্যাল লগইন। প্রটেক্টেড প্রোডাক্ট ডিটেইলস ও প্রোফাইল পেজ। ব্যবহারকারীর নাম পরিবর্তন ও রিয়েলটাইম সেশন আপডেট সুবিধাসম্পন্ন প্রোফাইল এডিট ফর্ম।

6. **বাজারভিত্তিক বিস্তারিত দর ও ৩-ম্যাট্রিক্স বিশ্লেষণ (Market-by-Market Price Analytics):**  
   প্রতিটি পণ্যের সর্বনিম্ন দর (Min Price), গড় দর (Average Price), এবং সর্বোচ্চ দর (Max Price) পৃথক কার্ডে প্রদর্শিত হয়, সাথে দেশের বিভিন্ন পাইকারি ও খুচরা বাজারের তালিকা।

---

## 🌐 মূল রাউটসমূহ (Application Routes)

| রাউট (Route) | বিবরণ (Description) | অ্যাক্সেস (Access) |
| :--- | :--- | :--- |
| `/` | মূল হোমপেজ (হিরো ব্যানার, দাম বেড়েছে/কমেছে, সব পণ্য) | পাবলিক (Public) |
| `/category/[slug]` | নির্দিষ্ট ক্যাটেগরির পণ্য তালিকা ও সর্টিং | পাবলিক (Public) |
| `/product/[slug]` | পণ্যের বিস্তারিত ও বাজারভিত্তিক আজকের দর | **সংরক্ষিত (Protected / Login Required)** |
| `/signin` | সাইন ইন ফর্ম ও সোশ্যাল লগইন | পাবলিক (Public) |
| `/signup` | নতুন অ্যাকাউন্ট নিবন্ধন ফর্ম | পাবলিক (Public) |
| `/profile` | ব্যবহারকারীর প্রোফাইল তথ্য | **সংরক্ষিত (Protected / Login Required)** |
| `/profile/update` | ব্যবহারকারীর নাম আপডেট ফর্ম (Challenge C3) | **সংরক্ষিত (Protected / Login Required)** |
| `/*` (Not Found) | বাংলায় কাস্টম ৪০৪ পৃষ্ঠা ও হোমে ফেরার বাটন | পাবলিক (Public) |

---

## 📡 এপিআই তথ্য (API Endpoints)

- **Main API Base:** `https://openapi.programming-hero.com/api/bazardor`
- **Fallback Mirror 1:** `https://api.api-store.workers.dev/api/bazardor`
- **Fallback Mirror 2:** `https://api.abcz.workers.dev/api/bazardor`
- **Endpoints:**
  - `GET /products` — সকল পণ্যের তালিকা
  - `GET /products?category={slug}` — ক্যাটেগরিভিত্তিক পণ্য
  - `GET /products/{id}` — নির্দিষ্ট পণ্যের বাজারভিত্তিক বিস্তারিত
  - `GET /categories` — সকল ক্যাটেগরির তালিকা
  - `GET /categories/{slug}` — নির্দিষ্ট ক্যাটেগরির তথ্য

---

## 🔐 এনভায়রনমেন্ট ভেরিয়েবল সেটআপ (Environment Variables)

প্রকল্পের রুট ডিরেক্টরিতে `.env.local` ফাইল তৈরি করুন এবং নিচের মানগুলো যুক্ত করুন:

```env
# Better Auth Configuration
BETTER_AUTH_SECRET="your-better-auth-secret-min-32-chars-long"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Production Database (PostgreSQL / Neon) - Optional for local, uses SQLite if omitted
DATABASE_URL="postgresql://username:password@ep-sample.us-east-1.aws.neon.tech/bazardor?sslmode=require"

# Optional Social OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

---

## 🚀 লোকাল ইনস্টলেশন ও রান করার নিয়ম (Local Installation)

### ১. রিপোজিটরি ক্লোন করুন
```bash
git clone https://github.com/mominofficial1/bazardor.git
cd bazardor
```

### ২. প্যাকেজ ইনস্টল করুন
```bash
npm install
```

### ৩. ডেভেলপমেন্ট সার্ভার চালু করুন
```bash
npm run dev
```
ব্রাউজারে [http://localhost:3000](http://localhost:3000) ওপেন করুন।

### ৪. প্রোডাকশন বিল্ড তৈরি করুন
```bash
npm run build
npm start
```

---

## 📦 ভার্সেল ডিপ্লয়মেন্ট (Vercel Deployment)

1. রিপোজিটরিটি GitHub-এ পুশ করুন।
2. [Vercel Dashboard](https://vercel.com/) এ গিয়ে **New Project** হিসেবে রিপোজিটরিটি সিলেক্ট করুন।
3. Environment Variables সেকশনে `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, এবং `DATABASE_URL` যুক্ত করুন।
4. **Deploy** বাটনে ক্লিক করুন।

---

## 🔗 লাইভ লিংক ও সাবমিশন (Submission Links)

- **GitHub Repository Link:** [https://github.com/mominofficial1/bazardor](https://github.com/mominofficial1/bazardor)
- **Live Vercel Link:** [https://bazardor-alpha.vercel.app](https://bazardor-alpha.vercel.app) *(or deployed URL)*
