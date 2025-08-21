import { AiOutlineShop } from "react-icons/ai";
import { Container } from "../components";
import { PiCurrencyCircleDollar } from "react-icons/pi";
import { BiShoppingBag } from "react-icons/bi";
import { CiDollar } from "react-icons/ci";

export function StatTile() {
  return (
    <div className="flex justify-center gap-3 mt-20 page-container">
      <Container>
        <div className="p-2 bg-gray-200 rounded-full ">
          <AiOutlineShop className="p-2 text-5xl text-black bg-white border rounded-full" />
        </div>
        <h1 className="text-2xl font-bold">10.5K</h1>
        <p className="text-sm font-semibold text-center w-45 ">
          Sallers active our site
        </p>
      </Container>
      <Container>
        <div className="p-2 bg-gray-200 rounded-full ">
          <PiCurrencyCircleDollar className="p-2 text-5xl text-black bg-white border rounded-full" />
        </div>
        <h1 className="text-2xl font-bold">33K</h1>
        <p className="text-sm font-semibold text-center w-45 ">
          Monthly Product sale
        </p>
      </Container>
      <Container>
        <div className="p-2 bg-gray-200 rounded-full ">
          <BiShoppingBag className="p-2 text-5xl text-black bg-white border rounded-full" />
        </div>
        <h1 className="text-2xl font-bold">45.5K</h1>
        <p className="text-sm font-semibold text-center w-45 ">
          Customer active in our site
        </p>
      </Container>
      <Container>
        <div className="p-2 bg-gray-200 rounded-full ">
          <CiDollar className="p-2 text-5xl text-black bg-white border rounded-full" />
        </div>
        <h1 className="text-2xl font-bold">25K</h1>
        <p className="text-sm font-semibold text-center w-45">
          Anual Gross sale in our site
        </p>
      </Container>
    </div>
  );
}
