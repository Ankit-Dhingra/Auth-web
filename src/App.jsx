import React from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Verification from "./pages/Verification";
import AuthLayout from "./Components/layouts/AuthLayout";
import RequireVerification from "./Components/layouts/RequireVerification";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verification" element={<Verification />} />
        <Route element={<AuthLayout />}>
          <Route path="/verification" element={<Verification />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route element={<RequireVerification />}>
            <Route path="/" element={<h1>Welcome to the App</h1>} />
            <Route path="/profile" element={<LoginPage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
