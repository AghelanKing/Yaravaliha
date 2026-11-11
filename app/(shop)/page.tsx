import AboutMe from "@/components/MYUI/AboutMe";
import BestSellers from "@/components/MYUI/BestSellers";
import Categories from "@/components/MYUI/Categories";
import HeroSection from "@/components/MYUI/HeroSection";
import WhySection from "@/components/MYUI/WhySection";

export default async function Page() {
  return (
    <div>
      <HeroSection />
      <Categories />
      <BestSellers />
      <AboutMe />
      <WhySection />
    </div>
  );
}
