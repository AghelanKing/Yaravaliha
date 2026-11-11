"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import ProductSlide, { type Product } from "./ProductSlide";
import { PiStarFourBold } from "react-icons/pi";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { TextAnimate } from "../ui/text-animate";
import Link from "next/link";
import { PulsatingButton } from "../ui/pulsating-button";
import { formatToman } from "@/lib/utils";

const products: Product[] = [
  {
    title: "فلش‌کارت نشانه‌ها و ترکیبات فارسی",
    price: 470000,
    href: "/",
    box: { src: "/products/box-1.webp", ratio: 700 / 613 },
    cards: [
      {
        src: "/products/p1-a.webp",
        w: 64,
        ratio: 338 / 420,
        side: "left",
        rotate: -16,
        show: 52,
        y: -20,
      },
      {
        src: "/products/p1-b.webp",
        w: 64,
        ratio: 256 / 320,
        side: "right",
        rotate: 15,
        show: 52,
        y: -20,
      },
      // کارت سوم: سمت چپ، پایین‌تر
      {
        src: "/products/p1-c.webp",
        w: 58,
        ratio: 335 / 420,
        side: "left",
        rotate: -6,
        show: 38,
        y: 26,
      },
    ],
  },
  {
    title: "فلش‌کارت اعداد ریاضی",
    price: 158000,
    href: "/",
    box: { src: "/products/box-2.webp", ratio: 700 / 562 },
    cards: [
      {
        src: "/products/p2-a.webp",
        w: 60,
        ratio: 344 / 420,
        side: "left",
        rotate: -16,
        show: 52,
        y: -22,
      },
      {
        src: "/products/p2-b.webp",
        w: 60,
        ratio: 334 / 420,
        side: "right",
        rotate: 15,
        show: 52,
        y: -22,
      },
      // کارت سوم: سمت راست، پایین‌تر
      {
        src: "/products/p2-c.webp",
        w: 56,
        ratio: 336 / 420,
        side: "right",
        rotate: 6,
        show: 38,
        y: 28,
      },
    ],
  },
  {
    title: "مکعب کوئیزنر پایه دوم",
    price: 110000,
    href: "/",
    box: { src: "/products/box-3.webp", ratio: 645 / 700 },
    cards: [
      {
        src: "/products/p3-a.webp",
        w: 68,
        ratio: 420 / 407,
        side: "left",
        rotate: -13,
        show: 50,
        y: -14,
      },
      {
        src: "/products/p3-b.webp",
        w: 20,
        ratio: 90 / 420,
        side: "right",
        rotate: 11,
        show: 38,
        y: -12,
      },
    ],
  },
  {
    title: "مکعب کوئیزنر پایه چهارم",
    price: 250000,
    href: "/",
    box: { src: "/products/box-4.webp", ratio: 637 / 683 },
    cards: [
      {
        src: "/products/p4-a.webp",
        w: 66,
        ratio: 408 / 420,
        side: "left",
        rotate: -13,
        show: 50,
        y: -14,
      },
      {
        src: "/products/p4-b.webp",
        w: 66,
        ratio: 420 / 414,
        side: "right",
        rotate: 12,
        show: 50,
        y: -14,
      },
    ],
  },
];

export default function BestSellers() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section dir="rtl" className="overflow-hidden bg-[#f1fdf4] py-20 px-7">
      <div className="flex items-center relative">
        <PiStarFourBold className="bg-sidebar-accent text-primary text-5xl p-2 rounded-xl absolute rotate-15 shadow-sm shadow-primary" />
        <div className="mr-10">
          <TextGenerateEffect
            classNameWord="text-xl md:text-4xl!"
            words={"محصولات محبوب"}
          />
          <TextAnimate startOnView once className="text-sm mt-2 text-gray-400">
            محبوب‌ترین ابزارهای یادگیری بین خانواده‌ها
          </TextAnimate>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        opts={{ direction: "rtl", loop: true }}
        className="mx-auto max-w-3xl"
        dir={"rtl"}
      >
        <CarouselContent>
          {products.map((p, i) => (
            <CarouselItem key={p.title} className="px-6">
              <Link href={p.href} className="flex flex-col items-center">
                <ProductSlide product={p} active={current === i} />
                <h3 className="text-center text-xl font-bold">{p.title}</h3>
                <h5 className="text-center my-5 text-lg text-primary font-bold">
                  {formatToman(p.price)}
                </h5>
                <PulsatingButton
                  duration="1.5s"
                  distance="6px"
                  className="mb-2"
                >
                  مشاهده محصول
                </PulsatingButton>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="right-0 left-auto rotate-180" />
        <CarouselNext className="left-0 right-auto rotate-180" />
      </Carousel>

      {/* نقطه‌های پایین */}
      <div className="mt-5 flex justify-center gap-2">
        {products.map((p, i) => (
          <button
            key={p.title}
            aria-label={`رفتن به ${p.title}`}
            onClick={() => api?.scrollTo(i)}
            className={`h-2.5 rounded-full transition-all ${
              current === i ? "w-8 bg-primary" : "w-2.5 bg-primary/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
