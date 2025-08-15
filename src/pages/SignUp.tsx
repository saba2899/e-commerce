import { Link } from "react-router";
import singup from "../assets/signup.avif";
import { Input, Button } from "../components";


export function SignUp() {
  return (
    <section className="page-container flex justify-center items-center mt-20 gap-20 mx-auto">
      <div>
        <img className="h-150 w-170" src={singup} alt={singup} />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl">Create an account</h1>
        <p className="text-sm">Enter your details below</p>
        <Input
          type="name"
          name="Name"
          placeholder="Name"
          className="w-full border-b pb-1 pr-3 pt-3 outline-none"
        />
        <Input
          type="email"
          name="email"
          placeholder="Email or Phone Number"
          className="w-full border-b pb-1 pr-3 pt-3 outline-none"
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border-b pb-1 pr-3 pt-3 outline-none"
        />
        <Button className="w-full bg-red-500 text-white mt-5 hover:bg-red-400">
          Create ACcount
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
      </div>
    </section>
  );
}
