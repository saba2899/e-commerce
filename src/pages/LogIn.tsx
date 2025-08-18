import type React from "react";
import singup from "../assets/signup.avif";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { logIn } from "../services/auth";
import { useNavigate } from "react-router";
import { useUser } from "../hooks/useUser";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }

    try {
      const user = await logIn(email, password);
      setUser(user);
      console.log("შესვლა წარმატებულია:", user);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else setError("უცნობი შეცდომა მოხდა");
    }
  }

  return (
    <section className="page-container flex justify-center items-center mt-20 gap-20 mx-auto">
      <div>
        <img className="h-150 w-170" src={singup} alt={singup} />
      </div>
      <form className="flex flex-col gap-5 " onSubmit={handleSubmit}>
        <h1 className="text-4xl">Log in to Exclusive</h1>
        <p className="text-sm">Enter your details below</p>

        <Input
          type="email"
          name="email"
          placeholder="Email or Phone Number"
          className="w-full border-b pb-1 pr-3 pt-3 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border-b pb-1 pr-3 pt-3 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

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
      </form>
    </section>
  );
}
