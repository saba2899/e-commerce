import { createBrowserRouter } from "react-router";

import { MainLayout } from "./layouts";

import { About, Contact, Home, LogIn, ProductDetails, SignUp } from './pages'

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
