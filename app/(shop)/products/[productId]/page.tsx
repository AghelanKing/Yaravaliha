import Product from "@/components/MYUI/products/Product";
import { Suspense } from "react";

export type PageProp = {
  params: Promise<{ productId?: string }>;
};

export default async function Page({ params }: PageProp) {
  return (
    <div className="mt-30 flex flex-col items-center p-7">
      <Suspense fallback={<p>درحال بارگذاری محصول...</p>}>
        <Product params={params} />
      </Suspense>
    </div>
  );
}
