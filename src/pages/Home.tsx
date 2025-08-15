import Button from "../components/Button.tsx";
import Category from "../components/Category.tsx";
import SideNav from "../components/SideNav.tsx";
import Slider from "../components/Slider";
import BestProducts from "../components/BestProducts.tsx";
import SalesCard from "../components/SalesCard.tsx";
import PromoBanner from "../components/PromoBanner.tsx";
import ExploreProducts from "../components/ExploreProducts.tsx";
import BenefitsRow from "../components/BenefitsRow.tsx";

export function Home() {
  return (
    <>
      <div className="page-container mt-2 flex items-start gap-6">
        <SideNav />
        <div className="min-w-8 ">
          <Slider />
        </div>
      </div>
      <SalesCard />
      <div className="flex justify-center mt-10 page-container">
        <Button className="w-70  bg-red-400 text-white hover:bg-red-500">
          View All Products
        </Button>
      </div>
      <Category />
      <BestProducts />
      <PromoBanner />
      <ExploreProducts />
      <div className="flex justify-center mt-10 page-container">
        <Button className="w-70  bg-red-400 text-white hover:bg-red-500">
          View All Products
        </Button>
      </div>
      <BenefitsRow />
    </>
  );
}

