import Button from "./Button";
import CountdownTimer from "./CountdownTimer";

export default function PromoBanner() {
  return (
    <div className="mt-30">
      <div className="flex items-center  m-auto bg-black w-6xl h-120">
        <div className="flex flex-col gap-10 m-auto">
          <h1 className="text-green-500">Categories</h1>
          <div>
            <h1 className="text-white text-5xl">Enhance Your</h1>
            <span className="text-white text-5xl">Music Experience</span>
          </div>
          <CountdownTimer targetDate={"2025-09-20T22:59:59"} variant="circle" />
          <Button className="w-50 bg-[#00FF66] hover:bg-[#00ff66c9] text-white text-md">
            Buy now
          </Button>
        </div>
        <div>
          <img src="src/assets/JBL.webp" alt="JBL" className="w-159" />
        </div>
      </div>
    </div>
  );
}
