import AsideSection from "@/components/MYUI/products/AsideSection";
import Products from "@/components/MYUI/products/Products";
import { TextAnimate } from "@/components/ui/text-animate";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Suspense } from "react";
import { AiOutlineProduct } from "react-icons/ai";

type PageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    target?: string;
    available?: string;
    selected?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  return (
    <div className="mt-30 flex flex-col items-center">
      <div className="flex relative text-center">
        <AiOutlineProduct className="bg-sidebar-accent mt-3.5 text-primary text-5xl p-2 rounded-xl absolute right-26 rotate-15 shadow-sm shadow-primary" />
        <div className="mr-10">
          <TextGenerateEffect
            classNameWord="text-xl md:text-4xl!"
            words={"محصولات آموزشی یاراولی‌ها"}
          />

          <div className="mb-5 flex gap-1.5 justify-center mt-2">
            <span className="h-1.5 w-12 rounded-full bg-primary" />
            <span className="h-1.5 w-4 rounded-full bg-[#facc15]" />
            <span className="h-1.5 w-2 rounded-full bg-[#d946ef]" />
          </div>

          <TextAnimate
            startOnView
            once
            className="text-sm text-gray-400 w-150 mx-auto"
          >
            با مجموعه‌ای از ابزارها و محصولات کمک‌آموزشی یاراولی‌ها، یادگیری رو
            برای بچه‌ها ساده‌تر، جذاب‌تر و لذت‌بخش‌تر کنیم. محصولات ما برای
            پایه‌های اول تا چهارم طراحی شدن تا آموزش و تمرین، رنگ‌وبوی بازی و
            سرگرمی بگیره.
          </TextAnimate>
        </div>
      </div>

      <div className="flex gap-5 mt-6 w-full p-7 relative">
        <AsideSection />
        <Suspense fallback={<p>در حال بارگذاری محصولات...</p>}>
          <ProductsWithFilter searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductsWithFilter({
  searchParams,
}: {
  searchParams: PageProps["searchParams"];
}) {
  const { page, category, minPrice, maxPrice, target, available, selected } =
    await searchParams;
  const currentPage = Number(page) || 1;

  const currentCategory = category || "all";

  const minPriceNumber = Number(minPrice) || 0;
  const maxPriceNumber = Number(maxPrice) || 2000000;

  const currentTarget = target || null;
  const currentAvailable = available || null;
  const currentSelected = selected || null;

  return (
    <Products
      page={currentPage}
      category={currentCategory}
      minPrice={minPriceNumber}
      maxPrice={maxPriceNumber}
      target={currentTarget}
      available={currentAvailable}
      selected={currentSelected}
    />
  );
}
