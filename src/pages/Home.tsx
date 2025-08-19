import Button from "../components/Button.tsx";
import Category from "../components/Category.tsx";
import SideNav from "../components/SideNav.tsx";
import Slider from "../components/Slider";
import BestProducts from "../components/BestProducts.tsx";
import SalesCard from "../components/SalesCard.tsx";
import PromoBanner from "../components/PromoBanner.tsx";
import ExploreProducts from "../components/ExploreProducts.tsx";
import BenefitsRow from "../components/BenefitsRow.tsx";

function Home() {
  return (
    <div className="flex flex-col gap-15">
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

export default Home;
