import { FaBookOpenReader } from "react-icons/fa6";
import { BlurFade } from "../ui/blur-fade";
import { TextAnimate } from "../ui/text-animate";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import FlyingButterfly from "./FlyingButterfly";

function AboutMe() {
  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-[#f1fdf4] py-20 md:py-28 -z-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <div className="flex relative">
            <FaBookOpenReader className="bg-sidebar-accent text-primary text-3xl p-2 rounded-xl absolute -right-6 -z-1 rotate-15 shadow-sm shadow-primary" />
            <span className="mb-3 inline-block rounded-full bg-secondary px-4 py-1 text-sm font-bold text-secondary-foreground">
              درباره‌ی ما
            </span>
          </div>

          <TextGenerateEffect
            classNameWord="mb-2 text-3xl font-extrabold leading-snug text- md:text-4xl"
            words="یادگیری رو برای بچه‌ها شیرین می‌کنیم"
            duration={0.1}
          />

          <div className="mb-6 flex gap-1.5">
            <span className="h-1.5 w-12 rounded-full bg-primary" />
            <span className="h-1.5 w-4 rounded-full bg-[#facc15]" />
            <span className="h-1.5 w-2 rounded-full bg-[#d946ef]" />
          </div>

          <TextAnimate
            animation="scaleUp"
            duration={0.7}
            startOnView
            once
            className="mb-4 text-lg leading-[1.9] text-muted-foreground"
          >
            کار ما از سال 1401 با یک هدف ساده شروع شد: ساخت وسایل کمک‌آموزشی
            برای دانش‌آموزان پایه‌ی اول؛ محصولاتی که بچه‌ها با دست و چشم و بازی
            یاد بگیرن، نه فقط با حفظ کردن.
          </TextAnimate>

          <TextAnimate
            animation="scaleUp"
            duration={0.7}
            startOnView
            once
            className="mb-8 text-lg leading-[1.9] text-muted-foreground"
          >
            با استقبال معلم‌ها و خانواده‌ها، مسیرمون رو ادامه دادیم و برای
            پایه‌های دوم، سوم و چهارم هم محصول ساختیم. بعد سراغ نیاز خود
            آموزگاران رفتیم و ابزارهایی طراحی کردیم که تدریس رو راحت‌تر و
            جذاب‌تر می‌کنه. امروز بیش از ۳۰ محصول آموزشی داریم و هنوز هم ساختن
            رو ادامه می‌دیم.
          </TextAnimate>

          {/* ویژگی‌ها */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <BlurFade
              inViewMargin="-10px"
              inView
              delay={0.16}
              className="rounded-2xl border bg-card p-4 shadow-sm"
            >
              <div className="text-2xl font-extrabold text-primary">4</div>
              <div className="text-sm text-muted-foreground">پایه‌ی تحصیلی</div>
            </BlurFade>
            <BlurFade
              inViewMargin="-10px"
              inView
              delay={0.16}
              className="rounded-2xl border bg-card p-4 shadow-sm"
            >
              <div className="text-2xl font-extrabold text-[#f97316]">+4</div>
              <div className="text-sm text-muted-foreground">سال تجربه</div>
            </BlurFade>
            <BlurFade
              inViewMargin="-10px"
              inView
              delay={0.16}
              className="rounded-2xl border bg-card p-4 shadow-sm"
            >
              <div className="text-2xl font-extrabold text-[#d946ef]">+30</div>
              <div className="text-sm text-muted-foreground">محصول آموزشی</div>
            </BlurFade>
          </div>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 blur-3xl sm:size-85" />
          <FlyingButterfly />
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
