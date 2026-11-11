import { PulsatingButton } from "@/components/ui/pulsating-button";
import { getProductImages, getProducts, ProductsCount } from "@/lib/data";
import { Product } from "@/lib/difintions";
import { formatToman, PRODUCTS_PER_PAGE } from "@/lib/utils";
import { PackageOpen } from "lucide-react";
import Image from "next/image";
import Pagination from "./Pagination";
import { Suspense } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import Link from "next/link";

async function Products({
  page,
  category,
  minPrice,
  maxPrice,
  target,
  available,
  selected,
}: {
  page: number;
  category: string;
  minPrice: number;
  maxPrice: number;
  target: string | null;
  available: string | null;
  selected: string | null;
}) {
  const [products, productsCount] = await Promise.all([
    getProducts(
      page,
      category,
      minPrice,
      maxPrice,
      target,
      available,
      selected,
    ),
    ProductsCount(category, minPrice, maxPrice, target, available, selected),
  ]);

  const totalPages = Math.ceil(productsCount / PRODUCTS_PER_PAGE);

  return (
    <div className="flex flex-col gap-y-5 w-[80%]">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-3 w-full">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 0 && (
        <Suspense>
          <Pagination totalPage={totalPages} />
        </Suspense>
      )}
    </div>
  );
}

async function ProductCard({ product }: { product: Product }) {
  const image = await getProductImages(product.id);

  return (
    <BlurFade inView className="border-2 p-3 rounded-xl flex flex-col h-full">
      <Link href={`/products/${product.id}`}>
        <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded-xl">
          {image?.image_url ? (
            <Image
              src={image.image_url}
              alt={image.alt_text || "تصویر محصول"}
              width={600}
              height={600}
              className={`max-w-full max-h-full w-auto h-auto object-contain rounded-xl ${product.stock_quantity === 0 ? "grayscale" : ""}`}
            />
          ) : (
            <PackageOpen className="size-12 text-primary/50" />
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-1 mt-4 m-3">
          <h2
            className={`text-lg font-bold leading-8 min-h-16 ${product.stock_quantity === 0 ? "text-gray-600" : ""}`}
          >
            {product.name}
          </h2>

          <h3 className="w-fit mt-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {product.category}
          </h3>

          {/* Price & Button */}
          <div className="flex items-center justify-between gap-2 mt-auto pt-5">
            <h3 className="text-lg text-primary font-bold whitespace-nowrap">
              {product.stock_quantity === 0
                ? "ناموجود"
                : formatToman(product.price)}
            </h3>

            <PulsatingButton duration="1.5s" distance="6px">
              مشاهده محصول
            </PulsatingButton>
          </div>
        </div>
      </Link>
    </BlurFade>
  );
}

export default Products;
