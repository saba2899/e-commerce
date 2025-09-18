import { FaRegEnvelope } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { Input, Button, MobileContactLayout } from "../components";
import { useEffect } from "react";

export function Contact() {
  useEffect(function () {
    document.title = `Exclusive | Contact`;
  }, []);

  return (
    <>
      {/* Mobile Layout */}
      <div className="sm:hidden">
        <MobileContactLayout />
      </div>

      {/* Desktop Layout */}
      <main className="hidden sm:flex items-center justify-center gap-4 mt-20 page-container">
        <div className="flex flex-col gap-4 p-6 shadow-md w-80 shrink-0">
          <div className="flex flex-col gap-3 pb-5 border-b ">
            <div className="flex items-center gap-3">
              <span>
                <LuPhone className="p-3 text-5xl text-white bg-red-700 rounded-full" />
              </span>
              <h1 className="font-semibold">Call To Us</h1>
            </div>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +995 593 14 13 12</p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span>
                <FaRegEnvelope className="p-3 text-5xl text-white bg-red-700 rounded-full" />
              </span>
              <h1>Write To Us</h1>
            </div>
            <p>Fill out our form and we will contact you within 24 hours/</p>
            <p>Email: custumer@exclusive.com</p>
          </div>
        </div>

        <div className="flex flex-col w-auto gap-5 p-5 shadow-md">
          <div className="flex gap-5">
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
            <Button className="text-white bg-red-600 w-60 hover:bg-red-600/70">
              Send Message
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
