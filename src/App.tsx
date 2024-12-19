import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { Home } from "./pages/Client/Home";
import ProductDetail from "./components/products/ProductDetail";
import Cart from "./pages/Client/Cart";
import ForgetPassword from "./pages/Client/ForgetPassword";
import AdminLayout from "./layouts/AdminLayout";
import UserAdmin from "./components/admin/User-Admin";
import ProductAdmin from "./components/admin/Product-admin";
import CategoryAdmin from "./components/admin/Category-admin";
import Statistics from "./components/admin/Statistics";
import SalesPage from "./components/Detail";
import AuthForm from "./pages/Auth/AuthForm";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateProducts from "./components/admin/Create-products";
function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route
        path='/dashboard/*'
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path='users' element={<UserAdmin />} />
                <Route path='products' element={<ProductAdmin />} />
                <Route
                  path='products/create-product'
                  element={<CreateProducts />}
                />
                <Route path='categories' element={<CategoryAdmin />} />
                <Route path='reports' element={<Statistics />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Public Routes */}
      <Route
        path='/'
        element={
          <Layout>
            <Routes>
              <Route index element={<Home />} />
              <Route path='cart' element={<Cart />} />
              <Route path='product' element={<ProductDetail />} />
              <Route path='test' element={<SalesPage />} />
            </Routes>
          </Layout>
        }
      />
      <Route path='/sign-in' element={<AuthForm />} />
    </Routes>
  );
}

export default App;
