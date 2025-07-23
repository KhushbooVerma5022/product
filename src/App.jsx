import { useEffect, useState } from 'react';
import NavBar from './components/Navbar'
import Products from './components/Products'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import AdminLayout from './admin/AdminLayout';
import AddProduct from './admin/components/AddProduct';
import EditProduct from './admin/components/EditProduct';
import Admin from './admin/Admin';

function App() {
  const [productCategory, setproductCategory] = useState([])

  const fetchCategory = async () => {
    const url = 'https://dummyjson.com/products/category-list';
    const data = await fetch(url);
    const parsedData = await data.json();

    setproductCategory(parsedData);
  }

  useEffect(() => {
    fetchCategory();
  }, [])

  return (
    <BrowserRouter basename="/product">
      <AppContent category={productCategory} />
    </BrowserRouter>
  )

  function AppContent({ category }) {

    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
      <>

        {!isAdminRoute && <NavBar category={category} />}
        <Routes>
          <Route path="/products/:category" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/" element={<Products />} />
          <Route path="/products/search" element={<Products />} />
          <Route path="/products/category/:id" element={<ProductDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/products" element={<AdminLayout />} />
          <Route path="/admin/addProduct" element={<AddProduct />} />
          <Route path="/admin/editProduct/:id" element={<EditProduct />} />
        </Routes>
      </>
    );
  }
}

export default App
