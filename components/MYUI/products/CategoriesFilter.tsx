"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const categories = [
  { label: "پایه اول" },
  { label: "پایه دوم" },
  { label: "پایه سوم" },
  { label: "پایه چهارم" },
];

function CategoriesFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  const createURLPage = (category: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (category) params.set("category", category);
    else params.delete("category");

    return `${pathname}?${params.toString()}`;
  };

  const currentCategory = searchParams.get("category") || "all";

  const isFiltered = currentCategory !== "all";

  const resetFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-background p-3 mt-4 rounded-xl">
      <h5 className="text-primary text-xl mb-1 font-semibold mr-3 mt-3">
        دسته بندی محصولات
      </h5>

      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-y-2 mt-2">
          {categories.map((category) => (
            <Link
              key={category.label}
              href={createURLPage(category.label)}
              className="font-semibold hover:text-primary"
            >
              {category.label}
            </Link>
          ))}
        </div>
        {isFiltered && (
          <button
            type="button"
            onClick={resetFilter}
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            <RotateCcw size={13} />
            حذف فیلتر
          </button>
        )}
      </div>
    </div>
  );
}

export default CategoriesFilter;
