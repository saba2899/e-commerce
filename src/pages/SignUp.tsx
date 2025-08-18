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

    // Validation regex
    const nameRegex = /^[\p{L}][\p{L}'-]{1,}(?: [\p{L}'-]{2,})*$/u; // at least 2 letters, allows Unicode, hyphen, apostrophe; optional surname
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

    if (!nameRegex.test(name.trim())) {
      setError(
        "Name must be at least 2 letters; letters, spaces, '-' and ' allowed"
      );
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters and include upper, lower, number, and symbol"
      );
      return;
    }

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
