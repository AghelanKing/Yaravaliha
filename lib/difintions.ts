export type TargetAudience = "دانش‌آموز" | "آموزگار" | "هردو";

export type Product = {
  id: string;
  name: string;
  short_description: string | null;
  content: Record<string, unknown>;
  price: number;
  stock_quantity: number;
  category: string | null;
  target_audience: TargetAudience;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  created_at: string;
};

export type ProductWithImages = Product & {
  product_images: ProductImage[];
};

export type ProductContentSection = {
  title: string;
  items?: string[];
  pages?: number;
  description?: string;
};

export type ProductContentHighlight = {
  title: string;
  summary?: string;
  description?: string;
};

export type ProductContentContact = {
  name?: string;
  phone?: string;
  message?: string;
};

export type ProductContentData = {
  intro?: string;
  description?: string;
  usage?: string;

  highlight?: ProductContentHighlight;
  sections?: ProductContentSection[];

  total_cards?: number;
  total_pages?: number;
  total_items?: number;

  format?: string;
  shipping_note?: string;

  contact?: ProductContentContact;
};
