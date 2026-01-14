import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiShoppingBag, FiUser, FiLogOut, FiHome, FiGrid, FiTag, FiLayers, FiSettings } from "react-icons/fi";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "navbar__link--active" : "";
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-icon">SM</div>
            Super Mall
          </Link>

          <div className="navbar__menu">
            <Link to="/" className={`navbar__link ${isActive("/")}`}>
              <FiHome style={{ marginRight: "6px" }} />
              Home
            </Link>
            <Link to="/shops" className={`navbar__link ${isActive("/shops")}`}>
              <FiShoppingBag style={{ marginRight: "6px" }} />
              Shops
            </Link>
            <Link to="/products" className={`navbar__link ${isActive("/products")}`}>
              <FiGrid style={{ marginRight: "6px" }} />
              Products
            </Link>
            <Link to="/offers" className={`navbar__link ${isActive("/offers")}`}>
              <FiTag style={{ marginRight: "6px" }} />
              Offers
            </Link>
            <Link to="/floors" className={`navbar__link ${isActive("/floors")}`}>
              <FiLayers style={{ marginRight: "6px" }} />
              Floor Map
            </Link>
            {isAdmin() && (
              <Link to="/admin" className={`navbar__link ${isActive("/admin")}`}>
                <FiSettings style={{ marginRight: "6px" }} />
                Admin
              </Link>
            )}
          </div>

          <div className="navbar__actions">
            {user ? (
              <>
                <span style={{ color: "var(--gray-600)", fontSize: "0.875rem" }}>
                  Hi, {user.name}
                </span>
                <button onClick={logout} className="btn btn--ghost btn--sm">
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn--ghost btn--sm">
                  <FiUser />
                  Login
                </Link>
                <Link to="/register" className="btn btn--primary btn--sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
