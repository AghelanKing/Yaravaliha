import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/ui/CrouselImage";
import { getProduct, getProductImage } from "@/lib/data";
import { formatToman } from "@/lib/utils";
import { notFound } from "next/navigation";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { ProductContent } from "./ProductContent";
import { ProductContentData } from "@/lib/difintions";
import { PageProp } from "@/app/(shop)/products/[productId]/page";

const spanClassName = "text-sm font-bold text-gray-500";

async function Product({ params }: PageProp) {
  const { productId } = await params;

  const product = await getProduct(productId);
  const images = await getProductImage(productId);

  if (!product || product.length === 0) {
    notFound();
  }

  const {
    category,
    is_featured,
    name,
    content,
    price,
    short_description,
    stock_quantity,
    target_audience,
  } = product[0];

  return (
    <section className="w-full flex flex-col items-center">
      <div className="relative flex w-[93%] flex-col items-start gap-3 lg:flex-row">
        <div className="w-full lg:w-[40%]">
          <ImageGallery
            images={images.map((image) => ({
              title: image.alt_text || name,
              url: image.image_url,
            }))}
          />
        </div>
        <div className="w-[60%]">
          <h1 className="text-3xl font-bold leading-relaxed">{name}</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            {short_description}
          </p>

          <hr className="mt-4 border-border" />

          <div className="mt-6 flex items-start justify-between gap-6">
            {/* Product Information */}
            <div className="w-[50%] space-y-5">
              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <span className={spanClassName}>دسته‌بندی:</span>
                <span className="w-fit rounded-full bg-primary/10 px-2.5 py-1 text-sm font-medium text-primary">
                  {category}
                </span>
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <span className={spanClassName}>مخاطب محصول:</span>
                <span className="w-fit rounded-full bg-primary/10 px-2.5 py-1 text-sm font-medium text-primary">
                  {target_audience}
                </span>
              </div>

              <div className="grid grid-cols-[120px_1fr] items-center gap-2">
                <span className={spanClassName}>محصول منتخب:</span>
                <span
                  className={`w-fit rounded-full px-2.5 py-1 text-sm font-medium ${
                    is_featured
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {is_featured ? "بله" : "خیر"}
                </span>
              </div>
            </div>

            {/* Purchase Card */}
            <div className="sticky top-6 w-[45%] rounded-xl border border-border bg-card p-4">
              <p className="mb-8 flex items-center gap-2 text-xs text-muted-foreground">
                <HiOutlineShieldCheck className="text-lg text-primary" />
                تضمین کیفیت و پشتیبانی قبل از خرید
              </p>

              {stock_quantity > 0 && (
                <span className="text-sm text-gray-400">قیمت محصول: </span>
              )}

              <h2
                className={`mt-2 text-2xl font-bold text-primary ${stock_quantity <= 0 ? "text-muted-foreground!" : ""}`}
              >
                {stock_quantity <= 0 ? "ناموجود" : formatToman(price)}
              </h2>

              {stock_quantity <= 0 ? (
                <Button
                  disabled
                  className="mt-6 w-full py-6 text-lg"
                  variant="secondary"
                >
                  متأسفیم، موجودی ندارد
                </Button>
              ) : (
                <Button className="mt-6 w-full py-6 text-lg">
                  افزودن به سبد خرید
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ProductContent content={content as ProductContentData | null} />
    </section>
  );
}

export default Product;
