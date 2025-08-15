import singup from "../assets/signup.avif";
import Button from "../components/Button";
import Input from "../components/Input";

export function LogIn() {
  return (
    <section className="page-container flex justify-center items-center mt-20 gap-20 mx-auto">
      <div>
        <img className="h-150 w-170" src={singup} alt={singup} />
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-4xl">Log in to Exclusive</h1>
        <p className="text-sm">Enter your details below</p>

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
        <div className="flex  gap-10 mt-3 items-center">
          <Button className="w-40 bg-red-500 text-white  hover:bg-red-400">
            Log in
          </Button>
          <div>
            <a className="text-red-500 hover:underline" href="">
              Forget Password?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
