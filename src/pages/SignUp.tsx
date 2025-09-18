import { Link } from "react-router";
import singup from "../assets/signup.avif";
import { Button, Input, MobileSignUpLayout } from "../components";
import { useEffect } from "react";
import { useUser } from "../context/useUser";
import { useNavigate } from "react-router";

export function SignUp() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      document.title = `Exclusive | Sign up`;

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
      <MobileSignUpLayout />

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
          <h1 className="text-4xl">Create an account</h1>
          <p className="text-sm">Enter your details below</p>

          <Input type="text" name="name" placeholder="Name" />
          <Input
            type="email"
            name="email"
            placeholder="Email or Phone Number"
          />
          <Input type="password" name="password" placeholder="Password" />

          <Button
            type="submit"
            className="w-full mt-5 text-white bg-red-500 hover:bg-red-400"
          >
            Create Account
          </Button>
          <div className="flex items-center justify-center mt-3">
            <p>
              Already have account?
              <span className="pl-3">
                <Link className="underline" to="/login">
                  Log in
                </Link>
              </span>
            </p>
          </div>
        </form>
      </section>
    </>
  );
}
