import React, { useState } from "react";
import {
  Navbar,
  Footer,
  ProductsPage,
  CartPage,
  ScrollTop,
} from "./components";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import CartProvider from "./context/CartProvider";
import AboutUs from "./components/AboutUs/AboutUs";
import Contact from "./components/Contact/ContactUs";
import LoginPage from "./components/login/Login";
import SignupPage from "./components/Signup/SignUp";
import AuthProvider from "./AuthProvider";
import Product from "./components/Product/Product";
import CheckoutPage from "./components/Checkout/CheckoutPage";
import Admin from "./components/admin/Admin";
import UsersPage from "./components/admin/UserManagement/UserPage";
import AdminOrdersPage from "./components/admin/OrderManagement/OrderPage";
import AdminAddShoePage from "./components/admin/Products/AdminAddShoePage";
import AdminRoute from "./components/admin/AdminRoute"; // Import custom route
import AdminAddJobPage from "./components/admin/JobManagement/JobManage";
import JobListPage from "./components/Jobpage/JobPage";
import JobApplyPage from "./components/Jobpage/JobApplyPage";
import AdminJobApplications from "./components/admin/JobApplications/JobApplications";
import UserProfile from "./components/Navbar/UserProfile";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

const Main = () => {
  const location = useLocation();

  // Hide Navbar and Footer on admin pages
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <main>
        <ScrollTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/products" element={<Product />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/joblist" element={<JobListPage />} />
          <Route path="/apply/:jobId" element={<JobApplyPage/>} />

          {/* Admin-Only Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <UsersPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <AdminOrdersPage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminAddShoePage />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/jobmanage"
            element={
              <AdminRoute>
                <AdminAddJobPage />
              </AdminRoute>
            }
          />

         <Route
            path="/admin/jobapplications"
            element={
              <AdminRoute>
                <AdminJobApplications />
              </AdminRoute>
            }
          />
        </Routes>
      </main>

      {!isAdminPage && <Footer />}
    </>
  );
};

export default App;
