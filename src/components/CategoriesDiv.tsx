import { CiMobile3 } from "react-icons/ci";
import { RiComputerLine } from "react-icons/ri";
import { BsSmartwatch } from "react-icons/bs";

import { CiCamera } from "react-icons/ci";
import { CiHeadphones } from "react-icons/ci";
import { MdOutlineVideogameAsset } from "react-icons/md";
import Container from "./Container";

export default function CategoriesDiv() {
  return (
    <div className="flex gap-5 mt-10">
      <Container>
        <CiMobile3 className="text-5xl" />
        <h3>Phones</h3>
      </Container>

      <Container>
        <RiComputerLine className="text-5xl" />
        <h3>Computers</h3>
      </Container>

      <Container>
        <BsSmartwatch className="text-5xl" />
        <h3>SmartWatch</h3>
      </Container>

      <Container>
        <CiCamera className="text-5xl" />
        <h3>Camera</h3>
      </Container>

      <Container>
        <CiHeadphones className="text-5xl" />
        <h3>HeadPhones</h3>
      </Container>

      <Container>
        <MdOutlineVideogameAsset className="text-5xl" />
        <h3>Gaming</h3>
      </Container>
    </div>
  );
}
