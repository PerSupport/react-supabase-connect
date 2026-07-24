import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CustomersPage from "./pages/CustomersPage";
import ClerksPage from "./pages/ClerksPage";
import CategoriesPage from "./pages/CategoriesPage";

import MainLayout from "./layouts/MainLayout";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";

export default function App() {

  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute> <MainLayout /> </ProtectedRoute>}>

            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="categories" element={<CategoriesPage />}/>
            <Route path="customers" element={<CustomersPage />}/>
            <Route path="clerks" element={<ClerksPage />}/>

        </Route>

      </Routes>

    </BrowserRouter>

  );

}