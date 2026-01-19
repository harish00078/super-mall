import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";
import { categoriesAPI } from "../services/api";

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesAPI.getAll();
        setCategories(response.data.data?.slice(0, 4) || []);
      } catch (error) {
        console.error("Error fetching categories for footer:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="navbar__logo-icon">SM</div>
              Super Mall
            </div>
            <p className="footer__description">
              Your premier shopping destination. Discover thousands of products from 
              hundreds of shops, all under one roof. Shop smart, shop local, shop Super Mall.
            </p>
          </div>

          <div>
            <h4 className="footer__title">Quick Links</h4>
            <div className="footer__links">
              <Link to="/shops" className="footer__link">All Shops</Link>
              <Link to="/products" className="footer__link">Products</Link>
              <Link to="/offers" className="footer__link">Today's Offers</Link>
              <Link to="/floors" className="footer__link">Floor Map</Link>
            </div>
          </div>

          <div>
            <h4 className="footer__title">Categories</h4>
            <div className="footer__links">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Link 
                    key={category._id} 
                    to={`/shops?category=${category._id}`} 
                    className="footer__link"
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <>
                  <Link to="/shops" className="footer__link">Electronics</Link>
                  <Link to="/shops" className="footer__link">Fashion</Link>
                  <Link to="/shops" className="footer__link">Food & Dining</Link>
                  <Link to="/shops" className="footer__link">Sports</Link>
                </>
              )}
            </div>
          </div>

          <div>
            <h4 className="footer__title">Contact</h4>
            <div className="footer__links">
              <span className="footer__link">Super Mall, Main Road</span>
              <span className="footer__link">City Center, 560001</span>
              <span className="footer__link">+91 98765 43210</span>
              <span className="footer__link">info@supermall.com</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2024 Super Mall. All rights reserved.
          </p>
          <div className="footer__socials">
            <a href="#" className="footer__social" aria-label="Facebook">
              <FiFacebook />
            </a>
            <a href="#" className="footer__social" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="#" className="footer__social" aria-label="Twitter">
              <FiTwitter />
            </a>
            <a href="#" className="footer__social" aria-label="YouTube">
              <FiYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
