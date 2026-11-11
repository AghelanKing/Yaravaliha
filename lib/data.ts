import { cacheLife, cacheTag } from "next/cache";
import { supabase } from "./supabase";
import { PRODUCTS_PER_PAGE } from "./utils";

export async function getProducts(
  page: number = 1,
  category: string = "all",
  minPrice: number = 0,
  maxPrice: number = 2000000,
  target: string | null = null,
  available: string | null = null,
  selected: string | null = null,
) {
  "use cache";

  cacheLife("hours");
  cacheTag("products");

  const offset = (page - 1) * PRODUCTS_PER_PAGE;

  let query = supabase.from("products").select("*").eq("is_active", true);

  if (category !== "all") {
    query = query.eq("category", category);
  }

  if (minPrice) {
    query = query.gte("price", minPrice);
  }

  if (maxPrice) {
    query = query.lte("price", maxPrice);
  }

  if (target) {
    query = query.eq("target_audience", target);
  }

  if (available) {
    query = query.gt("stock_quantity", 0);
  }

  if (selected) {
    query = query.eq("is_featured", true);
  }

  const { data, error } = await query
    .order("created_at", { ascending: true })
    .range(offset, offset + PRODUCTS_PER_PAGE - 1);

  if (error) {
    console.error("Supabase Error:", error.message);
    return [];
  }

  return data;
}

export async function ProductsCount(
  category: string = "all",
  minPrice: number = 0,
  maxPrice: number = 2000000,
  target: string | null = null,
  available: string | null = null,
  selected: string | null = null,
) {
  "use cache";

  cacheLife("hours");
  cacheTag("products");

  let query = supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("is_active", true);

  if (category !== "all") query = query.eq("category", category);

  if (minPrice) {
    query = query.gte("price", minPrice);
  }

  if (maxPrice) {
    query = query.lte("price", maxPrice);
  }

  if (target) {
    query = query.eq("target_audience", target);
  }

  if (available) {
    query = query.gt("stock_quantity", 0);
  }

  if (selected) {
    query = query.eq("is_featured", true);
  }

  const { count, error } = await query;

  if (error) {
    console.error("Supabase Error:", error.message);
    return 0;
  }

  return count ?? 0;
}

export async function getProductImages(productId: string) {
  "use cache";

  cacheLife("hours");
  cacheTag("productImages", `productImages-${productId}`);

  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .eq("is_primary", true)
    .maybeSingle();

  if (error) {
    console.error("Supabase Error:", error.message);
    return null;
  }

  if (!data) return null;

  const { data: imageData } = supabase.storage
    .from("product-images")
    .getPublicUrl(data.storage_path);

  return {
    ...data,
    image_url: imageData.publicUrl,
  };
}

export async function getProduct(productId: string | undefined) {
  "use cache";

  cacheLife("hours");
  cacheTag("product", `product-${productId}`);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId);

  if (error) {
    console.error("Supabase Error:", error.message);
    return null;
  }

  return data;
}

export async function getProductImage(productId?: string) {
  "use cache";

  cacheLife("hours");
  cacheTag("productImages", `productImages-${productId}`);

  const { data, error } = await supabase
    .from("product_images")
    .select("id, storage_path, alt_text, sort_order, is_primary")
    .eq("product_id", productId)
    .order("is_primary", { ascending: false })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Supabase Error:", error.message);
    return [];
  }

  return data.map((image) => {
    const { data: imageData } = supabase.storage
      .from("product-images")
      .getPublicUrl(image.storage_path);

    return {
      ...image,
      image_url: imageData.publicUrl,
    };
  });
}
