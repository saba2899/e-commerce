import {
  SideNav,
  Slider,
  Button,
  Category,
  BestProducts,
  PromoBanner,
  ExploreProducts,
  BenefitsRow,
  SalesCard,
} from "../components";

import { CATEGORIES_MOCK } from "../MOCK/CATEGORIES_MOCK";
import { HOME_SLIDER_MOCK } from "../MOCK/HOME_SLIDER_MOCK";

// Try to manage buissenes logic from one source/file
// Manage data outside the components e.g: SideNav, Slider

export function Home() {
  return (
    <>
      <div className="page-container mt-2 flex items-start gap-6">
        <SideNav
          list={CATEGORIES_MOCK}
        />

        <div className="min-w-8 ">
          <Slider
            list={HOME_SLIDER_MOCK}
          />
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

