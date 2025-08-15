import { Outlet } from "react-router";
import Footer from "../views/Footer.view";
import Header from "../views/Header.view";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <main className="w-full flex-1 flex flex-col items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
