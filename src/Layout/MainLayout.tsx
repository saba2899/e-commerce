import { Outlet } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
import { UserProvider } from "../context/UserContextProvider";
import BackToTop from "../components/BackToTop";
import SCrollToTop from "../components/ScrollToTop";

export const MainLayout = () => {
  return (
    <UserProvider>
      <SCrollToTop />
      <div className="flex flex-col min-h-screen mt-20 bg-gray-50">
        <Header />
        <main className="flex-1 w-full pb-20 lg:pb-0">
          <Outlet />
        </main>
        <Footer />
        <BottomNavigation />
      </div>

      <BackToTop />
    </UserProvider>
  );
};
