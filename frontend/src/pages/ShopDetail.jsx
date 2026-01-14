import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail, FiClock, FiStar, FiArrowLeft } from "react-icons/fi";
import { shopsAPI, productsAPI } from "../services/api";
import ProductCard from "../components/ProductCard";

export default function ShopDetail() {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShopData();
  }, [id]);

  const fetchShopData = async () => {
    try {
      setLoading(true);
      const [shopRes, productsRes] = await Promise.all([
        shopsAPI.getById(id),
        productsAPI.getAll({ shop: id }),
      ]);

      setShop(shopRes.data.data);
      setProducts(productsRes.data.data || []);
    } catch (error) {
      console.error("Error fetching shop:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <div className="skeleton" style={{ height: "300px", marginBottom: "2rem" }} />
          <div className="skeleton" style={{ width: "300px", height: "40px", marginBottom: "1rem" }} />
          <div className="skeleton" style={{ width: "100%", height: "80px" }} />
        </div>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="section">
        <div className="container text-center">
          <h2>Shop not found</h2>
          <Link to="/shops" className="btn btn--primary mt-4">
            Back to Shops
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        {/* Back Button */}
        <Link to="/shops" className="btn btn--ghost mb-4">
          <FiArrowLeft />
          Back to Shops
        </Link>

        {/* Shop Header */}
        <div
          style={{
            background: "var(--gradient-primary)",
            borderRadius: "var(--radius-2xl)",
            padding: "3rem",
            marginBottom: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            color: "white",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "var(--radius-xl)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "4rem",
            }}
          >
            {shop.category?.icon || "🏪"}
          </div>

          <div style={{ flex: 1 }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.2)",
                padding: "0.25rem 0.75rem",
                borderRadius: "var(--radius-full)",
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
              }}
            >
              {shop.category?.name || "Shop"}
            </span>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              {shop.name}
            </h1>
            <p style={{ opacity: 0.9, maxWidth: "600px" }}>
              {shop.description}
            </p>
          </div>

          {shop.rating > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "rgba(255,255,255,0.2)",
                padding: "1.5rem",
                borderRadius: "var(--radius-xl)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                <FiStar style={{ color: "var(--accent-amber)" }} />
                <span style={{ fontSize: "2rem", fontWeight: 800 }}>{shop.rating.toFixed(1)}</span>
              </div>
              <span style={{ fontSize: "0.875rem", opacity: 0.8 }}>
                {shop.totalRatings} reviews
              </span>
            </div>
          )}
        </div>

        {/* Shop Info Cards */}
        <div className="grid grid--4 mb-8">
          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "var(--primary-50)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary-600)",
                }}
              >
                <FiMapPin size={24} />
              </div>
              <div>
                <p style={{ fontSize: "0.875rem", color: "var(--gray-500)" }}>Location</p>
                <p style={{ fontWeight: 600 }}>{shop.location || shop.floor?.name}</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "var(--primary-50)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary-600)",
                }}
              >
                <FiClock size={24} />
              </div>
              <div>
                <p style={{ fontSize: "0.875rem", color: "var(--gray-500)" }}>Timings</p>
                <p style={{ fontWeight: 600 }}>{shop.openingTime} - {shop.closingTime}</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "var(--primary-50)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary-600)",
                }}
              >
                <FiPhone size={24} />
              </div>
              <div>
                <p style={{ fontSize: "0.875rem", color: "var(--gray-500)" }}>Phone</p>
                <p style={{ fontWeight: 600 }}>{shop.contactPhone || "Not available"}</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  background: "var(--primary-50)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--primary-600)",
                }}
              >
                <FiMail size={24} />
              </div>
              <div>
                <p style={{ fontSize: "0.875rem", color: "var(--gray-500)" }}>Email</p>
                <p style={{ fontWeight: 600, fontSize: "0.875rem" }}>{shop.contactEmail || "Not available"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="section__header" style={{ textAlign: "left" }}>
          <h2 className="section__title">Products from {shop.name}</h2>
          <p className="section__description">
            Showing {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid--4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "4rem",
              background: "var(--gray-50)",
              borderRadius: "var(--radius-xl)",
            }}
          >
            <p style={{ color: "var(--gray-500)" }}>
              No products available from this shop yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
