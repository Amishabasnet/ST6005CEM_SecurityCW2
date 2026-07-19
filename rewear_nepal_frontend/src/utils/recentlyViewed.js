const KEY = "rewear_recently_viewed";
const MAX_ITEMS = 8;

export function getRecentlyViewed() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewed(product) {
  if (!product?._id) return;
  const current = getRecentlyViewed().filter((p) => p._id !== product._id);
  const next = [product, ...current].slice(0, MAX_ITEMS);
  localStorage.setItem(KEY, JSON.stringify(next));
}
