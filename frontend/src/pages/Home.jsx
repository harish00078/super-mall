import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiTrendingUp, FiPercent } from "react-icons/fi";
import { shopsAPI, productsAPI, categoriesAPI, offersAPI } from "../services/api";
import ShopCard from "../components/ShopCard";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import OfferBanner from "../components/OfferBanner";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, shopsRes, productsRes, offersRes] = await Promise.all([
        categoriesAPI.getAll(),
        shopsAPI.getAll(),
        productsAPI.getOffers(),
        offersAPI.getAll(),
      ]);

      setCategories(categoriesRes.data.data || []);
      setShops(shopsRes.data.data?.slice(0, 4) || []);
      setProducts(productsRes.data.data?.slice(0, 8) || []);
      setOffers(offersRes.data.data?.slice(0, 4) || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero__content">
            <span className="hero__badge">
              <FiTrendingUp />
              Trending Now
            </span>
            <h1 className="hero__title">
              Discover Amazing <span>Shopping</span> Experience
            </h1>
            <p className="hero__description">
              Explore hundreds of shops, thousands of products, and exclusive offers. 
              Your one-stop destination for all your shopping needs.
            </p>
            <div className="hero__actions">
              <Link to="/shops" className="hero__btn--white">
                Explore Shops
                <FiArrowRight style={{ marginLeft: "8px" }} />
              </Link>
              <Link to="/offers" className="hero__btn--outline">
                View Offers
                <FiPercent style={{ marginLeft: "8px" }} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__eyebrow">
              <FiTrendingUp />
              Browse Categories
            </span>
            <h2 className="section__title">Shop by Category</h2>
            <p className="section__description">
              Discover shops and products across various categories
            </p>
          </div>

          <div className="grid grid--4 stagger">
            {loading ? (
              Array(8).fill(0).map((_, i) => (
                <div key={i} className="category-card">
                  <div className="skeleton" style={{ width: "80px", height: "80px", borderRadius: "16px" }} />
                  <div className="skeleton" style={{ width: "100px", height: "20px", marginTop: "16px" }} />
                </div>
              ))
            ) : (
              categories.map((category) => (
                <Link key={category._id} to={`/shops?category=${category._id}`}>
                  <CategoryCard category={category} />
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      {offers.length > 0 && (
        <section className="section section--gray">
          <div className="container">
            <div className="section__header">
              <span className="section__eyebrow">
                <FiPercent />
                Hot Deals
              </span>
              <h2 className="section__title">Today's Best Offers</h2>
              <p className="section__description">
                Don't miss out on these amazing deals from our shops
              </p>
            </div>

            <div className="grid grid--2">
              {offers.slice(0, 2).map((offer) => (
                <Link key={offer._id} to={`/offers/${offer._id}`}>
                  <OfferBanner offer={offer} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Shops Section */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <span className="section__eyebrow">Featured</span>
            <h2 className="section__title">Popular Shops</h2>
            <p className="section__description">
              Explore our most visited and highly rated shops
            </p>
          </div>

          <div className="grid grid--4 stagger">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="shop-card">
                  <div className="skeleton" style={{ height: "180px" }} />
                  <div style={{ padding: "20px" }}>
                    <div className="skeleton" style={{ width: "80px", height: "24px", marginBottom: "12px" }} />
                    <div className="skeleton" style={{ width: "100%", height: "24px", marginBottom: "8px" }} />
                    <div className="skeleton" style={{ width: "100%", height: "40px" }} />
                  </div>
                </div>
              ))
            ) : (
              shops.map((shop) => (
                <ShopCard key={shop._id} shop={shop} />
              ))
            )}
          </div>

          <div className="text-center mt-8">
            <Link to="/shops" className="btn btn--primary btn--lg">
              View All Shops
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Products with Offers Section */}
      <section className="section section--gray">
        <div className="container">
          <div className="section__header">
            <span className="section__eyebrow">
              <FiPercent />
              Special Offers
            </span>
            <h2 className="section__title">Products on Sale</h2>
            <p className="section__description">
              Get the best deals on products across all categories
            </p>
          </div>

          <div className="grid grid--4 stagger">
            {loading ? (
              Array(8).fill(0).map((_, i) => (
                <div key={i} className="product-card">
                  <div className="skeleton" style={{ height: "200px" }} />
                  <div style={{ padding: "20px" }}>
                    <div className="skeleton" style={{ width: "60px", height: "16px", marginBottom: "8px" }} />
                    <div className="skeleton" style={{ width: "100%", height: "20px", marginBottom: "12px" }} />
                    <div className="skeleton" style={{ width: "80px", height: "28px" }} />
                  </div>
                </div>
              ))
            ) : (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>

          <div className="text-center mt-8">
            <Link to="/products?hasOffer=true" className="btn btn--primary btn--lg">
              View All Offers
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: "var(--gradient-ocean)", color: "white" }}>
        <div className="container text-center">
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem" }}>
            Ready to Start Shopping?
          </h2>
          <p style={{ fontSize: "1.25rem", opacity: 0.9, marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Join thousands of shoppers who discover amazing deals every day at Super Mall.
          </p>
          <Link to="/register" className="hero__btn--white">
            Create Account
            <FiArrowRight style={{ marginLeft: "8px" }} />
          </Link>
        </div>
      </section>
    </>
  );
}
