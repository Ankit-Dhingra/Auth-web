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

const App = () => {
  return (
    <div>
      <Toaster position="top-center" />
      <Routes>
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
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
