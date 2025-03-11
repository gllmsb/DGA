import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { HomePage } from "./pages/HomePage"
import { CategoryPage } from "./pages/CategoryPage"
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { MainLayout } from "./layouts/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<div>404 Error Page Not Found </div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
