import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { UserProvider } from "../context/UserContextProvider";

export const MainLayout = () => {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="w-full flex-1 flex flex-col items-center justify-center">
          <Outlet />
        </main>
        <Footer />
      </div>
    </UserProvider>
  );
};
