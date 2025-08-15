import { SideNav, Slider, SalesCard, Button, Category, BestProducts, PromoBanner, ExploreProducts, BenefitsRow } from "../components";

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

