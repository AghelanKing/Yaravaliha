import { Suspense } from "react";
import CategoriesFilter from "./CategoriesFilter";
import PriceRangeFilter from "./PriceFilter";
import TargetFilter from "./TargetFilter";
import SwitchFilters from "./SwitchFilters";

function AsideSection() {
  return (
    <div className="bg-muted w-[20%] p-2 rounded-xl h-188">
      <h3 className="text-xl font-bold m-4">فیلتر ها</h3>

      <Suspense fallback={<p>درحال بارگذاری</p>}>
        <CategoriesFilter />
        <PriceRangeFilter />
        <TargetFilter />
        <SwitchFilters />
      </Suspense>
    </div>
  );
}

export default AsideSection;
