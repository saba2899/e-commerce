import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ProductDetails from "./pages/ProductDetails";
import { MainLayout } from "./layouts/Main.layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/singup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/productdetails",
        element: <ProductDetails />,
      },
    ],
  },
]);
