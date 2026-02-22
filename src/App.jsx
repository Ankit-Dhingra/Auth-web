import React from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Verification from "./pages/Verification";
import AuthLayout from "./Components/layouts/AuthLayout";
import RequireVerification from "./Components/layouts/RequireVerification";
import LoggedInLayout from "./Components/layouts/LoggedInLayout";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import SearchResult from "./Components/SearchResult";
import DebounceButton from "./Components/DebounceButton";
import ContactUs from "./Components/ContactUs";
import UseRefLearn from "./Components/UseRefLearn";
import UseReducerForm from "./Components/UseReducerForm";

const App = () => {
  return (
    <div>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/debounce" element={<DebounceButton />}></Route>
        <Route path="/contactUs" element={<ContactUs />}></Route>
        <Route path="/userRef" element={<UseRefLearn />}></Route>
        <Route path="/userReducer" element={<UseReducerForm />}></Route>
        <Route element={<LoggedInLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/verification" element={<Verification />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route element={<RequireVerification />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/products" element={<SearchResult />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
