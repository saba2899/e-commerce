import singup from "../assets/signup.avif";
import { Button, Input, MobileLoginLayout } from "../components";
import { useEffect } from "react";
import { useUser } from "../context/useUser";
import { useNavigate } from "react-router";

export function LogIn() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      document.title = `Exclusive | Log in`;

      // Redirect to home if user is already logged in
      if (user) {
        navigate("/", { replace: true });
      }
    },
    [user, navigate]
  );

  return (
    <>
      {/* Mobile Layout */}
      <MobileLoginLayout />

      {/* Desktop Layout */}
      <section className="hidden sm:flex items-center justify-center gap-20 mx-auto mt-20 page-container">
        <div>
          <img className="h-150 w-170" src={singup} alt={singup} />
        </div>
        <form
          className="flex flex-col gap-5"
          onSubmit={async (e) => {
            e.preventDefault();
            // Desktop form logic here
          }}
        >
          <h1 className="text-4xl">Log in to Exclusive</h1>
          <p className="text-sm">Enter your details below</p>

          <Input
            type="email"
            name="email"
            placeholder="Email or Phone Number"
            className="w-full pt-3 pb-1 pr-3 border-b outline-none"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full pt-3 pb-1 pr-3 border-b outline-none"
          />

          <div className="flex items-center gap-10 mt-3">
            <Button className="w-40 text-white bg-red-500 hover:bg-red-400">
              Log in
            </Button>
            <div>
              <a className="text-red-500 hover:underline" href="">
                Forget Password?
              </a>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
