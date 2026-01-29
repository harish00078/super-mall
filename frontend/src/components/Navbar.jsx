import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiShoppingBag, FiUser, FiLogOut, FiHome, FiGrid, FiTag, FiLayers, FiSettings, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path) => {
    return location.pathname === path ? "navbar__link--active" : "";
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__inner">
          <Link to="/" className="navbar__logo" onClick={closeMenu}>
            <div className="navbar__logo-icon">SM</div>
            Super Mall
          </Link>

          <button className="navbar__toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>

          <div className={`navbar__menu ${isMenuOpen ? "navbar__menu--open" : ""}`}>
            <Link to="/" className={`navbar__link ${isActive("/")}`} onClick={closeMenu}>
              <FiHome style={{ marginRight: "6px" }} />
              Home
            </Link>
            <Link to="/shops" className={`navbar__link ${isActive("/shops")}`} onClick={closeMenu}>
              <FiShoppingBag style={{ marginRight: "6px" }} />
              Shops
            </Link>
            <Link to="/products" className={`navbar__link ${isActive("/products")}`} onClick={closeMenu}>
              <FiGrid style={{ marginRight: "6px" }} />
              Products
            </Link>
            <Link to="/offers" className={`navbar__link ${isActive("/offers")}`} onClick={closeMenu}>
              <FiTag style={{ marginRight: "6px" }} />
              Offers
            </Link>
            <Link to="/floors" className={`navbar__link ${isActive("/floors")}`} onClick={closeMenu}>
              <FiLayers style={{ marginRight: "6px" }} />
              Floor Map
            </Link>
            {isAdmin() && (
              <Link to="/admin" className={`navbar__link ${isActive("/admin")}`} onClick={closeMenu}>
                <FiSettings style={{ marginRight: "6px" }} />
                Admin
              </Link>
            )}
            
            {/* Mobile Actions (Login/Logout) */}
            <div className="navbar__mobile-actions">
              {user ? (
                <>
                  <div className="navbar__user-info">
                    Hi, {user.name}
                  </div>
                  <button onClick={() => { logout(); closeMenu(); }} className="btn btn--ghost btn--sm btn--full">
                    <FiLogOut />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn--ghost btn--sm btn--full" onClick={closeMenu}>
                    <FiUser />
                    Login
                  </Link>
                  <Link to="/register" className="btn btn--primary btn--sm btn--full" onClick={closeMenu}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="navbar__actions desktop-only">
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
