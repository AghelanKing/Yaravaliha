import Link from "next/link";
import { Button } from "../ui/button";
import { PulsatingButton } from "../ui/pulsating-button";
import { SquigglyText } from "../ui/squiggly-text";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import FlashcardBox from "./FlashcardBox";

function HeroSection() {
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-2">
      <div className="flex h-full flex-col justify-center">
        <h1 className="mt-8 text-3xl font-bold text-foreground  md:text-4xl lg:text-5xl">
          محصولات کمک آموزشی{" "}
          <SquigglyText className="mr-2 mt-5 text-4xl! md:text-6xl! lg:text-7xl!">
            یاراولی ها
          </SquigglyText>
        </h1>

        <TextGenerateEffect
          classNameWord="mt-8 text-lg! font-semibold text-card-foreground"
          words="یاراولی‌ها؛ یادگیری شیرین، آینده‌ای درخشان!"
        />

        <TextGenerateEffect
          classNameWord="mt-6 text-base! font-semibold text-muted-foreground"
          duration={0.2}
          words="با ابزارهای آموزشی جذاب، یادگیری را به تجربه‌ای لذت‌بخش برای فرزندتان تبدیل کنید."
        />

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={"/products"}>
            <PulsatingButton duration="1.5s" distance="6px">
              گشتن در محصولات ما
            </PulsatingButton>
          </Link>
          <Link href={"/about"}>
            <Button className={"bg-secondary-foreground px-6 py-5"} size={"lg"}>
              درباره ما
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative h-full">
        <div className="pointer-events-none absolute left-1/2 top-[60%] -z-10 size-70 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 blur-3xl sm:size-100" />
        <FlashcardBox />
      </div>
    </div>
  );
}

export default HeroSection;
