import { Link, useNavigate } from "react-router";
import singup from "../assets/signup.avif";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { signUp } from "../services/auth";
import { useUser } from "../hooks/useUser";

export default function SingUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const user = await signUp(name, email, password);
      setUser(user);
      console.log("რეგისტრაცია წარმატებულია", user);
      navigate("/login");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("უცნობი შეცდომა მოხდა");
      }
    }
  }

  return (
    <section className="page-container flex justify-center items-center mt-20 gap-20 mx-auto">
      <div>
        <img className="h-150 w-170" src={singup} alt={singup} />
      </div>
      <form className="flex flex-col gap-5 p-4" onSubmit={handleSubmit}>
        <h1 className="text-4xl">Create an account</h1>
        <p className="text-sm">Enter your details below</p>

        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email or Phone Number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          type="submit"
          className="w-full bg-red-500 text-white mt-5 hover:bg-red-400"
        >
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
      </form>
    </section>
  );
}
