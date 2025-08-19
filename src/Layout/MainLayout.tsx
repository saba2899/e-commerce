import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
import { UserProvider } from "../context/UserContextProvider";
import BackToTop from "../components/BackToTop";

export const MainLayout = () => {
  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="w-full flex-1 pb-20 lg:pb-0">
          <Outlet />
        </main>
        <Footer />
        <BottomNavigation />
      </div>

      <BackToTop />
    </UserProvider>
  );
};
