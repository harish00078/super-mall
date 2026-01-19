import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shops from "./pages/Shops";
import ShopDetail from "./pages/ShopDetail";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Offers from "./pages/Offers";
import OfferDetail from "./pages/OfferDetail";
import Floors from "./pages/Floors";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import "./index.css";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="section"><div className="container text-center"><div className="skeleton" style={{ height: "400px" }} /></div></div>;
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/shops" element={<PrivateRoute><Shops /></PrivateRoute>} />
              <Route path="/shops/:id" element={<PrivateRoute><ShopDetail /></PrivateRoute>} />
              <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
              <Route path="/products/:id" element={<PrivateRoute><ProductDetail /></PrivateRoute>} />
              <Route path="/offers" element={<PrivateRoute><Offers /></PrivateRoute>} />
              <Route path="/offers/:id" element={<PrivateRoute><OfferDetail /></PrivateRoute>} />
              <Route path="/floors" element={<PrivateRoute><Floors /></PrivateRoute>} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--gray-900)",
              color: "white",
              borderRadius: "var(--radius-lg)",
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}
