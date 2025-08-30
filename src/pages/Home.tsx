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
} from "../components/";

export function Home() {
  useEffect(function () {
    document.title = `Exclusive | Home`;
  }, []);
  return (
    <div className="flex flex-col gap-20 ">
      <div className="flex items-start gap-6 mt-2 page-container">
        <SideNav />
        <div className="min-w-8 ">
          <Slider />
        </div>
      </div>
      <SalesCard />
      <div className="flex justify-center mt-10 page-container">
        <Button className="text-white bg-red-400 w-70 hover:bg-red-500 max-sm:w-full">
          View All Products
        </Button>
      </div>
      <Category />
      <BestProducts />
      <PromoBanner />
      <ExploreProducts />
      <div className="flex justify-center mt-10 page-container">
        <Button className="text-white bg-red-400 w-70 hover:bg-red-500 max-sm:w-full">
          View All Products
        </Button>
      </div>
      <BenefitsRow />
    </div>
  );
}
