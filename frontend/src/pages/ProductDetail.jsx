import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiShoppingBag, FiStar, FiCheck, FiInfo, FiTag } from "react-icons/fi";
import { productsAPI } from "../services/api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productsAPI.getById(id);
      setProduct(response.data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          style={{
            fill: i < fullStars ? "var(--accent-amber)" : "none",
            color: i < fullStars ? "var(--accent-amber)" : "var(--gray-300)",
          }}
        />
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <div className="grid grid--2">
             <div className="skeleton" style={{ height: "400px", borderRadius: "var(--radius-xl)" }} />
             <div>
                <div className="skeleton" style={{ height: "40px", marginBottom: "1rem" }} />
                <div className="skeleton" style={{ height: "20px", width: "60%", marginBottom: "2rem" }} />
                <div className="skeleton" style={{ height: "100px" }} />
             </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section">
        <div className="container text-center">
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📦</div>
          <h2 style={{ marginBottom: "1rem" }}>Product not found</h2>
          <Link to="/products" className="btn btn--primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="section">
      <div className="container">
        <Link to="/products" className="btn btn--ghost mb-8">
          <FiArrowLeft /> Back to Products
        </Link>

        <div className="grid grid--2" style={{ alignItems: "start", gap: "4rem" }}>
          {/* Left Column: Image/Icon */}
          <div 
            style={{ 
              background: "var(--gray-50)", 
              borderRadius: "var(--radius-2xl)", 
              padding: "4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative"
            }}
          >
            <div style={{ fontSize: "10rem" }}>
              {product.category?.icon || "📦"}
            </div>
            {discountPercentage > 0 && (
              <span 
                style={{
                  position: "absolute",
                  top: "2rem",
                  left: "2rem",
                  background: "var(--error)",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 700,
                  fontSize: "1.125rem"
                }}
              >
                {discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Right Column: Details */}
          <div>
             <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", color: "var(--primary-600)", fontWeight: 600 }}>
                <FiShoppingBag />
                <Link to={`/shops/${product.shop?._id}`} className="link">
                  {product.shop?.name || "Unknown Shop"}
                </Link>
             </div>

             <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem", lineHeight: 1.2 }}>
               {product.name}
             </h1>

             <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: "0.25rem" }}>
                   {renderStars(product.rating || 0)}
                </div>
                <span style={{ color: "var(--gray-500)" }}>
                   ({product.totalRatings || 0} reviews)
                </span>
             </div>

             <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "2rem" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--gray-900)" }}>
                   {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                   <span style={{ fontSize: "1.5rem", color: "var(--gray-400)", textDecoration: "line-through" }}>
                      {formatPrice(product.originalPrice)}
                   </span>
                )}
             </div>

             <p style={{ fontSize: "1.125rem", color: "var(--gray-600)", marginBottom: "2rem", lineHeight: 1.6 }}>
               {product.description}
             </p>

             {/* Specifications */}
             {product.specifications && Object.keys(product.specifications).length > 0 && (
               <div style={{ marginBottom: "2rem" }}>
                 <h3 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                   <FiInfo /> Specifications
                 </h3>
                 <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1rem", background: "var(--gray-50)", padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} style={{ display: "contents" }}>
                        <span style={{ fontWeight: 600, color: "var(--gray-600)" }}>{key}:</span>
                        <span>{value}</span>
                      </div>
                    ))}
                 </div>
               </div>
             )}

             {/* Stock Status */}
             <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: product.stock > 0 ? "var(--success)" : "var(--error)", fontWeight: 600, marginBottom: "2rem" }}>
                <FiCheck />
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
             </div>

             {/* Action Buttons */}
             <div style={{ display: "flex", gap: "1rem" }}>
                <Link to={`/shops/${product.shop?._id}`} className="btn btn--primary btn--lg" style={{ flex: 1, justifyContent: "center" }}>
                   Visit Shop
                </Link>
                {product.hasOffer && (
                   <Link to={`/offers/${product.offer}`} className="btn btn--outline btn--lg" style={{ flex: 1, justifyContent: "center" }}>
                      <FiTag /> View Offer
                   </Link>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
