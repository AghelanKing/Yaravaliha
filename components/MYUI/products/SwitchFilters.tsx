"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SwitchFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const isSelectedAvailable = searchParams.get("available") === "true";
  const isSelected = searchParams.get("selected") === "true";

  function handleChangeAvailable(checked: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");

    if (checked) {
      params.set("available", "true");
    } else {
      params.delete("available");
    }

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function handleChange(checked: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");

    if (checked) {
      params.set("selected", "true");
    } else {
      params.delete("selected");
    }

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="mt-4 rounded-xl bg-background p-3">
      <div className="flex items-center justify-around gap-2">
        <Label className="text-lg" htmlFor="Available">
          فقط کالاهای موجود
        </Label>

        <Switch
          checked={isSelectedAvailable}
          onCheckedChange={handleChangeAvailable}
          id="Available"
          dir="rtl"
        />
      </div>

      <div className="flex items-center justify-around gap-2 mt-3">
        <Label className="text-lg" htmlFor="Available">
          فقط کالاهای منتخب
        </Label>

        <Switch
          checked={isSelected}
          onCheckedChange={handleChange}
          id="Available"
          dir="rtl"
        />
      </div>
    </div>
  );
}

export default SwitchFilters;
