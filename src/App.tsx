import "./App.css";
import { Outlet, Route, Router, Routes } from "react-router-dom";
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
import AuthGuard from "./components/AuthGuard";
import TypeAdmin from "./components/admin/Type-admin";
function App() {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route
        path='/dashboard/*'
        element={
          <AdminLayout>
            <AuthGuard>
              <Routes>
                <Route path='/users' element={<UserAdmin />} />
                <Route path='/products' element={<ProductAdmin />} />
                <Route path='/categories' element={<CategoryAdmin />} />
                <Route path='/reports' element={<Statistics />} />
                <Route path='/type' element={<TypeAdmin />} />
              </Routes>
            </AuthGuard>
          </AdminLayout>
        }
      ></Route>

      {/* Public Routes */}
      <Route
        path='/'
        element={
          <Layout>
            <AuthGuard>
              <Routes>
                <Route index element={<Home />} />
                <Route path='cart' element={<Cart />} />
                <Route path='product' element={<ProductDetail />} />
                <Route path='test' element={<SalesPage />} />
              </Routes>
            </AuthGuard>
          </Layout>
        }
      ></Route>
      <Route path='/sign-in' element={<AuthForm />} />
    </Routes>
    // <Routes>
    //   <Route
    //     path='/dashboard/*'
    //     element={
    //       <AdminLayout>
    //         <AuthGuard>
    //           <Routes>
    //             <Route path='/users' element={<UserAdmin />} />
    //             <Route path='/products' element={<ProductAdmin />} />
    //             <Route path='/categories' element={<CategoryAdmin />} />
    //             <Route path='/reports' element={<Statistics />} />
    //           </Routes>
    //         </AuthGuard>
    //       </AdminLayout>
    //     }
    //   />
    //   <Route
    //     path='/'
    //     element={
    //       <Layout>
    //         <AuthGuard>
    //           <Routes>
    //             <Route index element={<Home />} />
    //             <Route path='/cart' element={<Cart />} />
    //             <Route path='/product' element={<ProductDetail />} />
    //             <Route path='/test' element={<SalesPage />} />
    //           </Routes>
    //         </AuthGuard>
    //       </Layout>
    //     }
    //   />
    //   {/* <Route index element={<Home />} />
    //     <Route path='/cart' element={<Cart />} />
    //     <Route path='/product' element={<ProductDetail />} />
    //     <Route path='/test' element={<SalesPage />}></Route> */}
    //   <Route path='/sign-in' element={<AuthForm />} />
    //   <Route path='/forget-password' element={<ForgetPassword />} />
    //   <Route path='*' element={<NotFound />} />
    // </Routes>
  );
}

export default App;
