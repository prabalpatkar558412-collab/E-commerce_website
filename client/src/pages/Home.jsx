import HeroSection from "../components/home/HeroSection";
import CategoriesSection from "../components/home/CategoriesSection";
import TrendingProducts from "../components/home/TrendingProducts";
import BrandShowcase from "../components/home/BrandShowcase";
import BestSellers from "../components/home/BestSellers";
import NewsletterSection from "../components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />

      <CategoriesSection />

      <TrendingProducts />

      <BrandShowcase />

      <BestSellers />

      <NewsletterSection />
    </>
  );
}