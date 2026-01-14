import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPercent, FiClock, FiArrowRight } from "react-icons/fi";
import { offersAPI } from "../services/api";
import OfferBanner from "../components/OfferBanner";

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await offersAPI.getAll();
      setOffers(response.data.data || []);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section__header">
          <span className="section__eyebrow">
            <FiPercent />
            Hot Deals
          </span>
          <h1 className="section__title">Today's Offers</h1>
          <p className="section__description">
            Don't miss out on these amazing deals from our shops
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid--2">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: "200px", borderRadius: "var(--radius-2xl)" }} />
            ))
          ) : offers.length > 0 ? (
            offers.map((offer) => (
              <div key={offer._id} className="card" style={{ overflow: "visible" }}>
                <div
                  style={{
                    background: i % 2 === 0 ? "var(--gradient-sunset)" : "var(--gradient-ocean)",
                    borderRadius: "var(--radius-xl)",
                    padding: "2rem",
                    color: "white",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        background: "rgba(0,0,0,0.2)",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "var(--radius-full)",
                        fontSize: "0.75rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <FiClock />
                      {getDaysRemaining(offer.endDate)} days left
                    </span>

                    <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                      {offer.title}
                    </h3>

                    <p style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                      {offer.discountType === "percentage" 
                        ? `${offer.discountValue}% OFF`
                        : `₹${offer.discountValue} OFF`
                      }
                    </p>

                    <p style={{ opacity: 0.9, marginBottom: "1rem" }}>
                      at {offer.shop?.name || "Super Mall"}
                    </p>

                    {offer.description && (
                      <p style={{ opacity: 0.8, fontSize: "0.875rem", marginBottom: "1rem" }}>
                        {offer.description}
                      </p>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                        Valid till {formatDate(offer.endDate)}
                      </span>
                      <Link
                        to={`/shops/${offer.shop?._id}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          background: "rgba(255,255,255,0.2)",
                          padding: "0.5rem 1rem",
                          borderRadius: "var(--radius-lg)",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "white",
                        }}
                      >
                        Shop Now
                        <FiArrowRight />
                      </Link>
                    </div>
                  </div>

                  {/* Decorative circles */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-30%",
                      right: "-10%",
                      width: "200px",
                      height: "200px",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "50%",
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem" }}>
              <p style={{ fontSize: "1.25rem", color: "var(--gray-500)", marginBottom: "1rem" }}>
                No active offers at the moment
              </p>
              <Link to="/products" className="btn btn--primary">
                Browse Products
              </Link>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div
          style={{
            marginTop: "4rem",
            padding: "3rem",
            background: "var(--gray-50)",
            borderRadius: "var(--radius-2xl)",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
            Never Miss a Deal! 🔔
          </h3>
          <p style={{ color: "var(--gray-600)", marginBottom: "1.5rem", maxWidth: "500px", margin: "0 auto 1.5rem" }}>
            Create an account to receive notifications about the latest offers and exclusive deals from your favorite shops.
          </p>
          <Link to="/register" className="btn btn--primary btn--lg">
            Sign Up for Alerts
          </Link>
        </div>
      </div>
    </div>
  );
}
