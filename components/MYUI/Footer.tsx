"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { SocialEitaColor, SocialEitaMono } from "@persianlabs/icons/react";

const quickLinks = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/products", label: "محصولات" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

const categories = [
  { href: "/products?grade=1", label: "پایه اول" },
  { href: "/products?grade=2", label: "پایه دوم" },
  { href: "/products?grade=3", label: "پایه سوم" },
  { href: "/products?grade=4", label: "پایه چهارم" },
];

export default function Footer() {
  return (
    <footer
      dir="rtl"
      className="relative isolate overflow-hidden bg-primary text-primary-foreground"
    >
      <div className="flex h-1.5 w-full">
        <span className="flex-1 bg-[#facc15]" />
        <span className="flex-1 bg-[#f97316]" />
        <span className="flex-1 bg-[#d946ef]" />
        <span className="flex-1 bg-[#22d3ee]" />
        <span className="flex-1 bg-[#facc15]" />
      </div>

      <div className="pointer-events-none absolute -left-24 top-10 -z-10 size-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 size-72 rounded-full bg-[#facc15]/15 blur-3xl" />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-white p-2">
              <Image src="/logo.png" alt="لوگو" width={64} height={44} />
            </div>
            <span className="text-xl font-extrabold">یاراولی ها</span>
          </div>
          <p className="text-sm leading-7 text-primary-foreground/80">
            تولید محصولات کمک‌آموزشی برای پایه‌ی اول تا چهارم ابتدایی؛ یادگیری
            شیرین برای بچه‌ها، تدریس راحت برای معلم‌ها.
          </p>
        </div>

        {/* دسترسی سریع */}
        <div>
          <h3 className="mb-4 text-lg font-bold">دسترسی سریع</h3>
          <ul className="space-y-3 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-primary-foreground/80 transition hover:text-[#facc15]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* دسته‌بندی */}
        <div>
          <h3 className="mb-4 text-lg font-bold">محصولات</h3>
          <ul className="space-y-3 text-sm">
            {categories.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-primary-foreground/80 transition hover:text-[#facc15]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* تماس */}
        <div>
          <h3 className="mb-4 text-lg font-bold">تماس با ما</h3>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#facc15]" />
              <span>استان یزد، یزد، بلوار شهید نواب صفوی، کوچه قدس</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-[#facc15]" />
              <span dir="ltr">0991 369 1898</span>
            </li>
            <li className="flex items-center gap-2">
              <SocialEitaMono className="size-4 shrink-0 text-[#facc15]" />
              <span dir="ltr">@Askarzadeh_yaravaliha</span>
            </li>
          </ul>

          <div className="mt-5 flex gap-3">
            {/* <a
              href="#"
              aria-label="اینستاگرام"
              className="grid size-10 place-items-center rounded-full bg-white/15 transition hover:-translate-y-1 hover:bg-[#d946ef]"
            >
              <Instagram className="size-5" />
            </a> */}
            <a
              href="#"
              aria-label="تلگرام"
              className="flex gap-x-2 p-2 place-items-center rounded-full bg-white/15 transition hover:-translate-y-1 hover:bg-[#e37600]/50"
            >
              <SocialEitaColor className="size-5" />
              کانال ایتا
            </a>
          </div>
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-sm text-primary-foreground/70 md:flex-row">
          <p>© ۱۴۰۴ تمامی حقوق برای یاراولی ها محفوظ است.</p>
          <p>
            ساخته شده توسط{" "}
            <a href="https://aghelan.vercel.app" target="_blank">
              AghelanCode
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
