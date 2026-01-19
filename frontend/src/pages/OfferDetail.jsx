import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiClock, FiPercent, FiShoppingBag, FiCalendar } from "react-icons/fi";
import { offersAPI } from "../services/api";
import ProductCard from "../components/ProductCard";

export default function OfferDetail() {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffer();
  }, [id]);

  const fetchOffer = async () => {
    try {
      const response = await offersAPI.getById(id);
      setOffer(response.data.data);
    } catch (error) {
      console.error("Error fetching offer:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <div className="skeleton" style={{ height: "300px", borderRadius: "var(--radius-2xl)", marginBottom: "2rem" }} />
          <div className="skeleton" style={{ width: "300px", height: "40px", marginBottom: "1rem" }} />
          <div className="skeleton" style={{ width: "100%", height: "20px" }} />
        </div>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="section">
        <div className="container text-center">
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
          <h2 style={{ marginBottom: "1rem" }}>Offer not found</h2>
          <p style={{ color: "var(--gray-500)", marginBottom: "2rem" }}>
            The offer you are looking for might have expired or been removed.
          </p>
          <Link to="/offers" className="btn btn--primary">
            Back to Offers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        {/* Back Button */}
        <Link to="/offers" className="btn btn--ghost mb-4">
          <FiArrowLeft />
          Back to Offers
        </Link>

        {/* Offer Header / Hero */}
        <div
          style={{
            background: "var(--gradient-sunset)",
            borderRadius: "var(--radius-2xl)",
            padding: "3rem",
            marginBottom: "3rem",
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "relative", zIndex: 1, display: "flex", gap: "3rem", flexWrap: "wrap", alignItems: "center" }}>
            
            {/* Discount Circle */}
            <div
              style={{
                width: "180px",
                height: "180px",
                background: "white",
                color: "var(--secondary-600)",
                borderRadius: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "1.25rem", fontWeight: 700 }}>FLAT</span>
              <span style={{ fontSize: "3.5rem", fontWeight: 900, lineHeight: 1 }}>
                {offer.discountType === "percentage" ? `${offer.discountValue}%` : `₹${offer.discountValue}`}
              </span>
              <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>OFF</span>
            </div>

            {/* Offer Info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                <span style={{ background: "rgba(0,0,0,0.2)", padding: "0.25rem 0.75rem", borderRadius: "var(--radius-full)", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
                  <FiClock /> {getDaysRemaining(offer.endDate)} days left
                </span>
                <span style={{ background: "rgba(0,0,0,0.2)", padding: "0.25rem 0.75rem", borderRadius: "var(--radius-full)", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem" }}>
                  <FiShoppingBag /> {offer.shop?.name}
                </span>
              </div>
              
              <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>
                {offer.title}
              </h1>
              
              <p style={{ fontSize: "1.25rem", opacity: 0.9, marginBottom: "2rem", maxWidth: "600px" }}>
                {offer.description}
              </p>

              <div style={{ display: "flex", gap: "2rem", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "1.5rem" }}>
                <div>
                  <div style={{ fontSize: "0.875rem", opacity: 0.8, marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <FiCalendar /> Start Date
                  </div>
                  <div style={{ fontWeight: 600 }}>{formatDate(offer.startDate)}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.875rem", opacity: 0.8, marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <FiCalendar /> End Date
                  </div>
                  <div style={{ fontWeight: 600 }}>{formatDate(offer.endDate)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Background Elements */}
          <div style={{ position: "absolute", top: "-50px", right: "-50px", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
          <div style={{ position: "absolute", bottom: "-100px", left: "20%", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
        </div>

        {/* Products Section */}
        {offer.products && offer.products.length > 0 && (
          <div className="section" style={{ padding: 0 }}>
             <div className="section__header" style={{ textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "end" }}>
              <div>
                <h2 className="section__title">Applicable Products</h2>
                <p className="section__description">
                  This offer is valid on the following products
                </p>
              </div>
              <Link to={`/shops/${offer.shop?._id}`} className="btn btn--outline">
                Visit Shop
              </Link>
            </div>

            <div className="grid grid--4 stagger">
              {offer.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
        
        {/* Terms Section */}
        {offer.termsAndConditions && (
             <div style={{ marginTop: "4rem", padding: "2rem", background: "var(--gray-50)", borderRadius: "var(--radius-xl)" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>Terms & Conditions</h3>
                <p style={{ color: "var(--gray-600)", whiteSpace: "pre-line" }}>{offer.termsAndConditions}</p>
             </div>
        )}
      </div>
    </div>
  );
}
