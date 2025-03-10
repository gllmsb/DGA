import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Navigation } from "../components/Navigation/Navigation";

export const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navigation />
      <main className="content">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};
