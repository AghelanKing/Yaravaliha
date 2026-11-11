import { FiLayers } from "react-icons/fi";
import { TextAnimate } from "../ui/text-animate";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";
import { BlurFade } from "../ui/blur-fade";

type Categories = {
  label: string;
  image: string;
  href: string;
};

export const categories = [
  { label: "محصولات پایه اول", image: "/images/categories/1.webp", href: "/" },
  { label: "محصولات پایه دوم", image: "/images/categories/2.webp", href: "/" },
  { label: "محصولات پایه سوم", image: "/images/categories/3.webp", href: "/" },
  {
    label: "محصولات پایه چهارم",
    image: "/images/categories/4.webp",
    href: "/",
  },
];

function Categories() {
  return (
    <div className="p-7">
      <div className="flex items-center relative">
        <FiLayers className="bg-sidebar-accent text-primary text-5xl p-2 rounded-xl absolute rotate-15 shadow-sm shadow-primary" />
        <div className="mr-10">
          <TextGenerateEffect
            classNameWord="text-xl md:text-4xl!"
            words={"دسته بندی محصولات"}
          />
          <TextAnimate startOnView once className="text-sm mt-2 text-gray-400">
            محصولات آموزشی مناسب هر پایه تحصیلی
          </TextAnimate>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        {categories.map((data) => (
          <CategotiesCard key={data.label} data={data} />
        ))}
      </div>
    </div>
  );
}

function CategotiesCard({ data }: { data: Categories }) {
  return (
    <BlurFade
      inView
      delay={0.15}
      className="relative rounded-2xl overflow-hidden border border-foreground hover:-translate-y-1 categoties-card"
    >
      <Link href={data.href}>
        <Image
          src={data.image}
          alt={`عکس ${data.label}`}
          width={180}
          height={150}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 right-0 left-0 h-[40%] bg-linear-to-t from-primary via-primary/80 to-transparent p-7 flex justify-between items-center">
          <h2 className="text-secondary font-bold text-2xl mt-5">
            {data.label}
          </h2>
          <FaChevronLeft className="text-secondary text-xl mt-5 chevron" />
        </div>
      </Link>
    </BlurFade>
  );
}

export default Categories;
