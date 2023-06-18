import { Route, Routes } from "react-router-dom";
import Pricing from "./pages/pricing";
import Portofolio from "./pages/portofolio";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import { AuthProvider, useIsAuthenticated } from "react-auth-kit";
import AdminDashboard from "./pages/adminDashboard";
import Dashboard from "./pages/dashboard";
function App() {
  return (
    <AuthProvider
      authType={"cookie"}
      authName={"_auth"}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portofolio" element={<Portofolio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
