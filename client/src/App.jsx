import { useEffect, useState } from 'react';

import NavBar from './components/Navbar';
import Products from './components/Products';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import AdminLayout from './admin/AdminLayout';
import AddProduct from './admin/components/AddProduct';
import EditProduct from './admin/components/EditProduct';
import Admin from './admin/Admin';
import SignIn from './admin/components/SignIn';
import SignUp from './admin/components/SignUp';
import UserLogin from './components/UserLogin';
import Dashboard from './admin/components/SellerDashboard';
import ProductList from './admin/components/ProductList';
import ProtectedRoute from './admin/ProtectedRoute';
import buildAPIUrls from './utils/helper';
import CartPage from './components/CartPage';

function App() {
  const [productCategory, setproductCategory] = useState([]);

  const fetchCategory = async () => {
    const url = buildAPIUrls('/products/category-list');
    const data = await fetch(url);
    const parsedData = await data.json();

    setproductCategory(parsedData);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <BrowserRouter>
      <AppContent category={productCategory} />
    </BrowserRouter>
  );
}

function AppContent({ category }) {
  const location = useLocation();
  const hideNavbarRoutes = ['/admin', '/cart'];
  const shouldHideNavbar = hideNavbarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <>
      {!shouldHideNavbar && <NavBar category={category} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path="/product/:category" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Products />} />
        <Route path="/products/search" element={<Products />} />

        {/* Admin Routes */}
        <Route path="/sellerhub" element={<Admin />} />
        <Route path="/admin/signIn" element={<SignIn />} />
        <Route path="/admin/signUp" element={<SignUp />} />

        <Route path="/admin" element={<AdminLayout />}>
          {/* Protecting Admin Routes */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="addProduct"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="editProduct/:id"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* User Routes */}
        <Route path="/user" element={<UserLogin />} />
      </Routes>
    </>
  );
}

export default App;
