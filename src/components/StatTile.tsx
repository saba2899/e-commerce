import { AiOutlineShop } from "react-icons/ai";
import Container from "./Container";
import { PiCurrencyCircleDollar } from "react-icons/pi";
import { BiShoppingBag } from "react-icons/bi";
import { CiDollar } from "react-icons/ci";

export default function StatTile() {
  return (
    <div className="page-container flex gap-3 mt-20 justify-center">
      <Container>
        <div className=" rounded-full p-2 bg-gray-200">
          <AiOutlineShop className="text-5xl border rounded-full p-2 bg-white text-black" />
        </div>
        <h1 className="font-bold text-2xl">10.5K</h1>
        <p className="text-sm w-45 text-center font-semibold ">
          Sallers active our site
        </p>
      </Container>
      <Container>
        <div className=" rounded-full p-2 bg-gray-200">
          <PiCurrencyCircleDollar className="text-5xl border rounded-full p-2 bg-white text-black" />
        </div>
        <h1 className="font-bold text-2xl">33K</h1>
        <p className="text-sm w-45 text-center font-semibold ">
          Monthly Product sale
        </p>
      </Container>
      <Container>
        <div className=" rounded-full p-2 bg-gray-200">
          <BiShoppingBag className="text-5xl border rounded-full p-2 bg-white text-black" />
        </div>
        <h1 className="font-bold text-2xl">45.5K</h1>
        <p className="text-sm w-45 text-center font-semibold ">
          Customer active in our site
        </p>
      </Container>
      <Container>
        <div className=" rounded-full p-2 bg-gray-200">
          <CiDollar className="text-5xl border rounded-full p-2 bg-white text-black" />
        </div>
        <h1 className="font-bold text-2xl">25K</h1>
        <p className="text-sm w-45 text-center font-semibold">
          Anual Gross sale in our site
        </p>
      </Container>
    </div>
  );
}
