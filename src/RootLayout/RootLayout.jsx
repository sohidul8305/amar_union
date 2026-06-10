import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footerr/Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* Navbar */}
      <header className="w-full">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full mt-auto">
        <Footer />
      </footer>

    </div>
  );
};

export default RootLayout;