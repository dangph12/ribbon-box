import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const homepageLayout = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex justify-center items-center flex-1 mx-auto">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default homepageLayout;
