import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import MainLayout from "./components/MainLayout";
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import ActivateScreen from "./screens/ActivateScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import AIChatWidget from "./components/AIChatWidget";
import AppBootstrap from "./components/AppBootstrap";

function App() {
  return (
    <Router>
      <AppBootstrap />
      <Header />
      <Toast />
      <main className="py-6 md:py-8 min-h-[80vh] relative bg-surface-muted">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/reset-password/:uid/:token" element={<ResetPasswordScreen />} />
          <Route path="/activate/:uid/:token" element={<ActivateScreen />} />
          <Route
            path="/"
            element={
              <MainLayout>
                <HomeScreen />
              </MainLayout>
            }
          />
          <Route
            path="/products"
            element={
              <MainLayout>
                <ProductsScreen />
              </MainLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <MainLayout>
                <ProfileScreen />
              </MainLayout>
            }
          />
          <Route
            path="/shipping"
            element={
              <MainLayout>
                <ShippingScreen />
              </MainLayout>
            }
          />
          <Route
            path="/payment"
            element={
              <MainLayout>
                <PaymentScreen />
              </MainLayout>
            }
          />
          <Route
            path="/placeorder"
            element={
              <MainLayout>
                <PlaceOrderScreen />
              </MainLayout>
            }
          />
          <Route
            path="/order/:id"
            element={
              <MainLayout>
                <OrderScreen />
              </MainLayout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <MainLayout>
                <ProductScreen />
              </MainLayout>
            }
          />
          <Route
            path="/cart/:id?"
            element={
              <MainLayout>
                <CartScreen />
              </MainLayout>
            }
          />
          <Route
            path="/about"
            element={
              <MainLayout>
                <AboutScreen />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <ContactScreen />
              </MainLayout>
            }
          />
          <Route
            path="/admin/userlist"
            element={
              <MainLayout>
                <UserListScreen />
              </MainLayout>
            }
          />
          <Route
            path="/admin/user/:id/edit"
            element={
              <MainLayout>
                <UserEditScreen />
              </MainLayout>
            }
          />
          <Route
            path="/admin/productlist"
            element={
              <MainLayout>
                <ProductListScreen />
              </MainLayout>
            }
          />
          <Route
            path="/admin/products/:id/edit"
            element={
              <MainLayout>
                <ProductEditScreen />
              </MainLayout>
            }
          />
          <Route
            path="/admin/orderlist"
            element={
              <MainLayout>
                <OrderListScreen />
              </MainLayout>
            }
          />
        </Routes>
      </main>
      <AIChatWidget />
      <Footer />
    </Router>
  );
}

export default App;
