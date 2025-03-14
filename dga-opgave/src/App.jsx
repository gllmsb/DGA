import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { HomePage } from "./pages/HomePage"
import { CategoryPage } from "./pages/CategoryPage"
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { MainLayout } from "./layouts/MainLayout";
import { UserProvider } from "./context/UserContext";
import { AdCreationPage } from "./pages/AdCreationPage";

function App() {
  return (
    <Router>
      <UserProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/product/:productSlug" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/opret-annonce" element={<AdCreationPage />} />
          <Route path="*" element={<div>404 Error Page Not Found </div>} />
        </Route>
      </Routes>
    </UserProvider>
    </Router>
  );
}

export default App
