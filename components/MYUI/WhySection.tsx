import { TextGenerateEffect } from "../ui/text-generate-effect";
import { TextAnimate } from "../ui/text-animate";
import { PiLightbulbFilament } from "react-icons/pi";
import { BlurFade } from "../ui/blur-fade";
import { GraduationCap, Award, Wallet, Puzzle } from "lucide-react";
import { IconType } from "react-icons";

type Data = {
  label: string;
  description: string;
  icon: IconType;
  delay: number;
  borderColor: string;
};

const WhyData = [
  {
    label: "طراحی توسط آموزگار پایه اول",
    description:
      "طراحی محصولات با تکیه بر ۱۳ سال تجربه تدریس در پایه اول ابتدایی و شناخت نیازهای آموزشی دانش‌آموزان.",
    icon: GraduationCap,
    delay: 0.1,
    borderColor: "#facc15",
  },
  {
    label: "کیفیت ساخت بالا",
    description:
      "استفاده از مقوای ضخیم و روکش سلفونی براق برای دوام بیشتر کارت‌ها؛ همچنین امکان نوشتن روی آن‌ها با ماژیک و پاک کردن نوشته‌ها برای استفاده مجدد.",
    icon: Award,
    delay: 0.25,
    borderColor: "#f97316",
  },
  {
    label: "قیمت اقتصادی",
    description:
      "چاپ محصولات در تیراژ بالا با هدف کاهش هزینه تولید و فراهم کردن امکان تهیه آن‌ها با قیمتی مقرون‌به‌صرفه.",
    icon: Wallet,
    delay: 0.4,
    borderColor: "#d946ef",
  },
  {
    label: "بازی‌ها و فعالیت‌های آموزشی مکمل",
    description:
      "ارائه بازی‌ها و فعالیت‌های مرتبط با کارت‌ها در کانال مجموعه، برای ایجاد تنوع در تمرین و تقویت یادگیری.",
    icon: Puzzle,
    delay: 0.55,
    borderColor: "#22d3ee",
  },
];

function WhySection() {
  return (
    <div className="p-7">
      <div className="flex items-center relative">
        <PiLightbulbFilament className="bg-sidebar-accent text-primary text-5xl p-2 rounded-xl absolute rotate-15 shadow-sm shadow-primary" />
        <div className="mr-10">
          <TextGenerateEffect
            classNameWord="text-xl md:text-4xl!"
            words={"چرا یاراولی ها؟"}
          />
          <TextAnimate startOnView once className="text-sm mt-2 text-gray-400">
            همراهی با یادگیری بهتر فرزندان شما
          </TextAnimate>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-6 justify-center">
        {WhyData.map((data) => (
          <WhyCard key={data.label} data={data} />
        ))}
      </div>
    </div>
  );
}

function WhyCard({ data }: { data: Data }) {
  const Icon = data.icon;
  return (
    <BlurFade
      delay={data.delay}
      inView
      style={{ borderColor: data.borderColor }}
      className="bg-primary-foreground border-2 rounded-2xl p-5 w-full md:w-1/2 lg:w-[22%] min-h-55"
    >
      <div className="flex size-14 items-center justify-center rounded-xl bg-chart-2/15">
        <Icon className="size-6 text-chart-2" />
      </div>

      <h3 className="mt-5 font-bold text-xl text-secondary-foreground">
        {data.label}
      </h3>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {data.description}
      </p>
    </BlurFade>
  );
}

export default WhySection;
