/**
 * Bengali number, currency, date and text formatting utilities for BazarDor
 */

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const WESTERN_DIGITS_MAP: Record<string, string> = {
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
  '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9',
};

/**
 * Convert Western digits (0-9) to Bengali digits (০-৯)
 */
export function toBengaliDigits(input: number | string | null | undefined): string {
  if (input === null || input === undefined || input === '') return '০';
  const str = input.toString();
  return str.replace(/[0-9]/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)] ?? digit);
}

/**
 * Convert Bengali digits (০-৯) back to Western digits (0-9) for mathematical operations/sorting
 */
export function toWesternDigits(input: string | number | null | undefined): string {
  if (input === null || input === undefined) return '0';
  const str = input.toString();
  return str.replace(/[০-৯]/g, (char) => WESTERN_DIGITS_MAP[char] ?? char);
}

/**
 * Parse any price (numeric, English string, Bengali numeral string) into a clean JS number
 */
export function parseNumericPrice(value: unknown): number {
  if (typeof value === 'number') return isNaN(value) ? 0 : value;
  if (!value) return 0;
  const cleaned = toWesternDigits(String(value)).replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format currency with Bengali numerals and 'টাকা' suffix
 * e.g. 148 -> "১৪৮ টাকা", 1850 -> "১,৮৫০ টাকা"
 */
export function formatBengaliCurrency(amount: number | string | null | undefined): string {
  const num = parseNumericPrice(amount);
  const formattedWestern = new Intl.NumberFormat('en-IN').format(num);
  return `${toBengaliDigits(formattedWestern)} টাকা`;
}

/**
 * Format percentage in Bengali
 * e.g. 2.1 -> "২.১%"
 */
export function formatBengaliPercent(pct: number | string | null | undefined): string {
  const num = Math.abs(parseNumericPrice(pct));
  const rounded = Number(num.toFixed(1));
  return `${toBengaliDigits(rounded)}%`;
}

/**
 * Normalize units to natural Bengali phrases
 */
export function formatBengaliUnit(unit: string | null | undefined): string {
  if (!unit) return 'প্রতি কেজি';
  const lower = unit.toLowerCase().trim();
  switch (lower) {
    case 'kg':
    case 'কেজি':
      return 'প্রতি কেজি';
    case 'liter':
    case 'litre':
    case 'লিটার':
      return 'প্রতি লিটার';
    case 'dozen':
    case 'ডজন':
      return 'প্রতি ডজন';
    case 'hali':
    case 'হালি':
      return 'প্রতি হালি';
    case 'piece':
    case 'pcs':
    case 'পিস':
      return 'প্রতি পিস';
    case 'bosta':
    case 'বস্তা':
      return 'প্রতি বস্তা';
    case 'gm':
    case 'গ্রাম':
      return 'প্রতি গ্রাম';
    default:
      if (unit.startsWith('প্রতি')) return unit;
      return `প্রতি ${unit}`;
  }
}

/**
 * Get formatted current date in Bengali with weekday, Bengali month name, and Bengali digits
 */
export function getCurrentBengaliDate(): string {
  const now = new Date();
  
  const weekdays = [
    'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'
  ];
  
  const bengaliMonths = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  const weekday = weekdays[now.getDay()];
  const day = toBengaliDigits(now.getDate());
  const month = bengaliMonths[now.getMonth()];
  const year = toBengaliDigits(now.getFullYear());

  return `${weekday}, ${day} ${month} ${year}`;
}

/**
 * Fallback emojis based on category or product name keywords
 */
export function getProductEmoji(name?: string, category?: string, defaultImg?: string): string {
  if (defaultImg && defaultImg.trim().length > 0 && !defaultImg.startsWith('http')) {
    return defaultImg;
  }
  const n = (name || '').toLowerCase();
  const c = (category || '').toLowerCase();

  if (c === 'chal' || n.includes('চাল')) return '🍚';
  if (c === 'dal' || n.includes('ডাল') || n.includes('ছোলা')) return '🫘';
  if (c === 'tel' || n.includes('তেল')) return '🛢️';
  if (c === 'mach' || n.includes('মাছ') || n.includes('ইলিশ') || n.includes('রুই')) return '🐟';
  if (c === 'mangsho' || n.includes('মাংস') || n.includes('মুরগি') || n.includes('গরু')) return '🍗';
  if (c === 'dim-dui' || n.includes('ডিম') || n.includes('দুধ')) return '🥚';
  if (c === 'mosla' || n.includes('মসলা') || n.includes('মরিচ') || n.includes('হলুদ')) return '🌶️';
  if (n.includes('আলু')) return '🥔';
  if (n.includes('পেঁয়াজ') || n.includes('পিয়াজ')) return '🧅';
  if (n.includes('রসুন')) return '🧄';
  if (n.includes('আদা')) return '🫚';
  if (n.includes('ঢেঁড়স')) return '🥬';
  if (n.includes('টমেটো')) return '🍅';
  if (c === 'sobji' || n.includes('সবজি')) return '🥬';

  return '🛒';
}
