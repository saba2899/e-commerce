import { useEffect } from "react";
import {
  Button,
  Category,
  SideNav,
  Slider,
  BestProducts,
  SalesCard,
  PromoBanner,
  ExploreProducts,
  BenefitsRow,
  MobileHomeLayout,
} from "../components/";

export function Home() {
  useEffect(function () {
    document.title = `Exclusive | Home`;
  }, []);

  return (
    <>
      {/* Mobile Layout */}
      <MobileHomeLayout />

      {/* Desktop Layout */}
      <div className="hidden sm:flex flex-col gap-20">
        <div className="flex items-start gap-6 mt-2 page-container">
          <SideNav />
          <div className="min-w-8 ">
            <Slider />
          </div>
        </div>
        <SalesCard />
        <div className="flex justify-center mt-10 page-container">
          <Button className="text-white bg-red-400 w-70 hover:bg-red-500">
            View All Products
          </Button>
        </div>
        <Category />
        <BestProducts />
        <PromoBanner />
        <ExploreProducts />
        <div className="flex justify-center mt-10 page-container">
          <Button className="text-white bg-red-400 w-70 hover:bg-red-500">
            View All Products
          </Button>
        </div>
        <BenefitsRow />
      </div>
    </>
  );
}
