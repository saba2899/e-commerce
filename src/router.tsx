import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { MainLayout } from "./Layout/MainLayout";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import RequireAuth from "./components/RequireAuth";

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
        path: "/signup",
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
      {
        path: "/profile",
        element: (
          <RequireAuth>
            <Profile />
          </RequireAuth>
        ),
      },
    ],
  },
]);
