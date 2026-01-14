import { Link } from "react-router-dom";
import { FiStar, FiPlusCircle, FiCheckCircle } from "react-icons/fi";

export default function ProductCard({ product, onCompareToggle, isInCompare }) {
  const discountPercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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
            fill: i < fullStars ? "currentColor" : "none",
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-card__image">
        {product.category?.icon || "📦"}
        
        {discountPercentage > 0 && (
          <span className="product-card__badge">
            {discountPercentage}% OFF
          </span>
        )}
        
        {onCompareToggle && (
          <button
            className={`product-card__compare ${isInCompare ? "product-card__compare--active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onCompareToggle(product);
            }}
            title={isInCompare ? "Remove from compare" : "Add to compare"}
          >
            {isInCompare ? <FiCheckCircle /> : <FiPlusCircle />}
          </button>
        )}
      </div>
      
      <Link to={`/products/${product._id}`} className="product-card__content">
        <p className="product-card__shop">{product.shop?.name || "Shop"}</p>
        <h3 className="product-card__name">{product.name}</h3>
        
        <div className="product-card__price-row">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {product.originalPrice > product.price && (
            <span className="product-card__original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="product-card__discount">
              Save {discountPercentage}%
            </span>
          )}
        </div>
        
        {product.rating > 0 && (
          <div className="product-card__rating">
            <span className="product-card__stars">
              {renderStars(product.rating)}
            </span>
            <span>({product.totalRatings || 0})</span>
          </div>
        )}
      </Link>
    </div>
  );
}
