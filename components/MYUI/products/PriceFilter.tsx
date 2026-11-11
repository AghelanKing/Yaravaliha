"use client";

import { useState } from "react";
import { Slider } from "../../ui/slider";
import { formatToman } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RotateCcw } from "lucide-react";

const MIN_PRICE = 0;
const MAX_PRICE = 2_000_000;
const STEP = 20_000;

function PriceFilter() {
  const [price, setPrice] = useState<number[]>([0, 2_000_000]);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function handlePriceChange(value: number[]) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("minPrice", String(value[0]));
      params.set("maxPrice", String(value[1]));
    } else {
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  }

  const resetFilter = () => {
    setPrice([MIN_PRICE, MAX_PRICE]);
    handlePriceChange([MIN_PRICE, MAX_PRICE]);
  };

  const isFiltered = price[0] !== MIN_PRICE || price[1] !== MAX_PRICE;

  return (
    <div className="bg-background flex flex-col w-full mt-3 p-3 rounded-xl">
      <div className="flex justify-between items-center">
        <h5 className="text-primary text-xl mb-1 font-semibold mr-3 mt-3">
          محدوده قیمت
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

      <div className="mt-5 px-2">
        <Slider
          dir="ltr"
          value={price}
          onValueChange={(value) => {
            if (Array.isArray(value)) {
              const newPrice = [...value];

              setPrice(newPrice);
              handlePriceChange(newPrice);
            }
          }}
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={STEP}
        />
      </div>

      <div className="flex items-center justify-between gap-3 mt-2 w-full">
        <div className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-center h-full">
          <p className="mb-1 text-xs text-muted-foreground">از</p>
          <p className="text-sm font-semibold text-foreground">
            {formatToman(price[0])}
          </p>
        </div>

        <div className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-center h-full">
          <p className="mb-1 text-xs text-muted-foreground">تا</p>
          <p className="text-sm font-semibold text-foreground">
            {formatToman(price[1])}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PriceFilter;
