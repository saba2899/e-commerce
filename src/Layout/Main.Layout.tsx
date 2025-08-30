import { Outlet } from "react-router";
import { Footer, Header, BottomNavigation } from "../view";
import { SCrollToTop, BackToTop } from "../components";
import { UserProvider } from "../context/UserContextProvider";

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
