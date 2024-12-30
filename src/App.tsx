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
import AuthForm from "./pages/Auth/AuthForm";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateProducts from "./components/admin/Create-products";
import EditProduct from "./components/admin/Edit-product";
import BrandAdmin from "./components/admin/Brand-admin";
import BannerAdmin from "./components/admin/Banner-admin";
import { UserProfile } from "./components/User-profile";
import ChangePassword from "./pages/Client/ChangePassword";
import Checkout from "./pages/Client/Checkout";
import OrderHistory from "./components/OrderHistory";
import OrderAdmin from "./components/admin/Order-admin";
import ScrollToTop from "./components/hooks/ccrollToTop";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Admin Routes */}
        <Route
          path='/dashboard/*'
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='users' element={<UserAdmin />} />
                  <Route path='products' element={<ProductAdmin />} />
                  <Route
                    path='products/create-product'
                    element={<CreateProducts />}
                  />
                  <Route path='products/edit/:id' element={<EditProduct />} />
                  <Route path='categories' element={<CategoryAdmin />} />
                  <Route path='order' element={<OrderAdmin />} />
                  <Route path='brand' element={<BrandAdmin />} />
                  <Route path='banner' element={<BannerAdmin />} />
                  <Route path='reports' element={<Statistics />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route
          path='/*'
          element={
            <Layout>
              <Routes>
                <Route path='/' index element={<Home />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/product' element={<ProductDetail />} />
                <Route path='user/order' element={<OrderHistory />} />
                <Route path='products/:id' element={<ProductDetail />} />
                {/* <Route path='/test' element={<SalesPage />} /> */}
                <Route path='/user/profile' element={<UserProfile />} />
                <Route path='/payment/payment-success' element={<Checkout />} />
                <Route
                  path='/user/change-password'
                  element={<ChangePassword />}
                />
                <Route
                  path='/user/reset-password'
                  element={<ChangePassword />}
                />
              </Routes>
            </Layout>
          }
        />
        <Route path='/sign-in' element={<AuthForm />} />
        <Route path='/reset-password' element={<ForgetPassword />} />
      </Routes>
    </>
  );
}

export default App;
