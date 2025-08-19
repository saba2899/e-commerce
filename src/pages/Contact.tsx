import { FaRegEnvelope } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Contact() {
  return (
    <main className="flex gap-4 justify-center mt-20 page-container items-center  max-sm:flex-col">
      <div className="flex flex-col p-6 gap-4 w-80 shrink-0 shadow-md">
        <div className=" flex flex-col gap-3 border-b pb-5">
          <div className="flex items-center gap-3">
            <span>
              <LuPhone className="bg-red-700 text-white text-5xl rounded-full p-3" />
            </span>
            <h1 className="font-semibold">Call To Us</h1>
          </div>
          <p>We are available 24/7, 7 days a week.</p>
          <p>Phone: +995 593 14 13 12</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span>
              <FaRegEnvelope className="bg-red-700 text-white text-5xl rounded-full p-3" />
            </span>
            <h1>Write To Us</h1>
          </div>
          <p>Fill out our form and we will contact you within 24 hours/</p>
          <p>Email: custumer@exclusive.com</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 w-auto shadow-md p-5 max-sm:flex-col">
        <div className="flex gap-5 max-sm:flex-col">
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            className="bg-[#EFF0F6] p-2 placeholder=[#A0A3BD] outline-none"
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            className="bg-[#EFF0F6] p-2 placeholder=[#A0A3BD] outline-none"
          />
          <Input
            type="text"
            name="phone"
            placeholder="Your Phone"
            className="bg-[#EFF0F6] p-2 placeholder=[#A0A3BD] outline-none"
          />
        </div>
        <div className="flex flex-col items-end gap-3">
          <textarea
            name="message"
            id=""
            placeholder="Your Message"
            className="w-full h-50 p-2 bg-[#EFF0F6] placeholder=[#A0A3BD] outline-none"
          />
          <Button className="bg-red-600 text-white w-60 hover:bg-red-600/70">
            Send Message
          </Button>
        </div>
      </div>
    </main>
  );
}
