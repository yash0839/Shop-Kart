// All FakeStore API calls live here, so pages never call fetch() directly.
const BASE_URL = "https://fakestoreapi.com";

// Successful GET responses are remembered for the session so pages load instantly
// when you navigate back and forth. Failed requests are never cached (so "Retry" works).
const cache = new Map();

async function request(path) {
  if (cache.has(path)) return cache.get(path);

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`);
  } catch {
    throw new Error("Network error. Please check your internet connection and try again.");
  }

  if (!response.ok) {
    throw new Error(`The server returned an error (status ${response.status}). Please try again.`);
  }

  // FakeStore returns an empty body (not a 404) for unknown product ids.
  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("The server sent an unexpected response. Please try again.");
    }
  }

  cache.set(path, data);
  return data;
}

function expectList(data) {
  if (!Array.isArray(data)) throw new Error("The server sent an unexpected response. Please try again.");
  return data;
}

export const getProducts = async () => expectList(await request("/products"));

export const getCategories = async () => expectList(await request("/products/categories"));

export const getProductsByCategory = async (category) =>
  expectList(await request(`/products/category/${encodeURIComponent(category)}`));

export async function getProductById(id) {
  const product = await request(`/products/${encodeURIComponent(id)}`);
  if (!product || typeof product !== "object") throw new Error("Product not found.");
  return product;
}

/* ---------- Small helpers used by many components ---------- */

export const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

// "men's clothing" -> "Men's Clothing"
export const formatCategory = (category = "") =>
  category.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());

/*
  DEMO OFFER: FakeStore has no discount data. To show a "discount" UI we derive a
  stable percentage from the product id and compute a pretend list price.
  The real price (what the customer pays) is ALWAYS the API price.
*/
const DEMO_DISCOUNTS = [10, 15, 20, 25, 30];
export function getDemoOffer(product) {
  const discountPercent = DEMO_DISCOUNTS[product.id % DEMO_DISCOUNTS.length];
  const listPrice = product.price / (1 - discountPercent / 100);
  return { discountPercent, listPrice };
}
