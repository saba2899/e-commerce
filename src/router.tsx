import { createBrowserRouter } from "react-router";

import {
  Home,
  Contact,
  About,
  SignUp,
  LogIn,
  ProductDetails,
  Profile,
  Favorites,
} from "./pages";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";

import { MainLayout } from "./Layout/Main.Layout";

import { RequireAuth } from "./components";

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
        path: "/favorites",
        element: <Favorites />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
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
