import { Category, Product } from '@/types/product';

const API_BASES = [
  'https://openapi.programming-hero.com/api/bazardor',
  'https://api.api-store.workers.dev/api/bazardor',
  'https://api.abcz.workers.dev/api/bazardor',
];

/**
 * Robust fetch wrapper with automatic fallback across mirrors and timeout control
 */
async function fetchWithFallbacks<T>(endpoint: string, options?: RequestInit): Promise<T> {
  let lastError: Error | null = null;

  for (const base of API_BASES) {
    try {
      const url = `${base}${endpoint}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          ...(options?.headers || {}),
        },
        next: { revalidate: 60 },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} from ${base}`);
      }

      const data = await response.json();
      return data as T;
    } catch (err: unknown) {
      lastError = err instanceof Error ? err : new Error(String(err));
      // Try next mirror
    }
  }

  throw lastError || new Error(`Failed to fetch from all endpoints: ${endpoint}`);
}

/**
 * Fetch all products
 */
export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const endpoint = category && category !== 'all' ? `/products?category=${encodeURIComponent(category)}` : '/products';
    const products = await fetchWithFallbacks<Product[]>(endpoint);
    return Array.isArray(products) ? products : [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await fetchWithFallbacks<Category[]>('/categories');
    return Array.isArray(categories) ? categories : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch single category by slug or id
 */
export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const category = await fetchWithFallbacks<Category>(`/categories/${encodeURIComponent(slug)}`);
    if (category && category.slug) return category;
  } catch {
    // fallback: check in all categories list
  }

  try {
    const all = await getCategories();
    return all.find((c) => c.slug === slug || c.id === slug) || null;
  } catch {
    return null;
  }
}

/**
 * Fetch single product by id or slug
 */
export async function getProduct(idOrSlug: string | number): Promise<Product | null> {
  const param = String(idOrSlug).trim();

  // If numeric ID, try direct endpoint first
  if (/^\d+$/.test(param)) {
    try {
      const product = await fetchWithFallbacks<Product>(`/products/${param}`);
      if (product && product.id) return product;
    } catch {
      // fallback to searching all products
    }
  }

  // Lookup in all products by slug or ID
  try {
    const all = await getProducts();
    const found = all.find((p) => p.slug === param || String(p.id) === param);
    if (found) {
      // If found in list, and it has no markets or needs full details, try its ID if available
      if (found.markets && found.markets.length > 0) {
        return found;
      }
      try {
        const full = await fetchWithFallbacks<Product>(`/products/${found.id}`);
        if (full && full.id) return full;
      } catch {
        // use found
      }
      return found;
    }
  } catch (err) {
    console.error('Error finding product:', err);
  }

  return null;
}
