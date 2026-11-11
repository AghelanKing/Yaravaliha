"use client";

import { RotateCcw } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const target = [
  { label: "دانش‌آموز" },
  { label: "آموزگار" },
  { label: "هر دو" },
];

function TargetFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const router = useRouter();

  const createURLPage = (target: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (target) params.set("target", target);
    else params.delete("target");

    return `${pathname}?${params.toString()}`;
  };

  const isFiltered = searchParams.get("target");

  const resetFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("target");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-background p-3 mt-4 rounded-xl">
      <div className="flex justify-between items-center">
        <h5 className="text-primary text-xl mb-1 font-semibold mr-3 mt-3">
          مخاطب محصول
        </h5>
        {isFiltered && (
          <button
            type="button"
            onClick={resetFilter}
            className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary mt-3"
          >
            <RotateCcw size={13} />
            حذف فیلتر
          </button>
        )}
      </div>

      <div className="flex flex-col gap-y-2 mt-2">
        {target.map((target) => (
          <Link
            key={target.label}
            href={createURLPage(target.label)}
            className="font-semibold hover:text-primary"
          >
            {target.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TargetFilter;
