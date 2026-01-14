import { FiX } from "react-icons/fi";

export default function CompareProducts({ products, onRemove, onCompare }) {
  if (products.length === 0) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get all unique specification keys
  const getAllSpecs = () => {
    const specs = new Set();
    products.forEach((product) => {
      if (product.specifications) {
        const specObj = product.specifications instanceof Map 
          ? Object.fromEntries(product.specifications) 
          : product.specifications;
        Object.keys(specObj).forEach((key) => specs.add(key));
      }
    });
    return Array.from(specs);
  };

  const getSpecValue = (product, key) => {
    if (!product.specifications) return "-";
    const specObj = product.specifications instanceof Map 
      ? Object.fromEntries(product.specifications) 
      : product.specifications;
    return specObj[key] || "-";
  };

  return (
    <div className="compare-table">
      {/* Header with products */}
      <div className="compare-table__header">
        <div className="compare-table__cell">Features</div>
        {products.map((product) => (
          <div key={product._id} className="compare-table__cell">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span>{product.name}</span>
              <button
                onClick={() => onRemove(product._id)}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "none",
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "white",
                }}
              >
                <FiX size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Price Row */}
      <div className="compare-table__row">
        <div className="compare-table__label">Price</div>
        {products.map((product) => (
          <div key={product._id} className="compare-table__value" style={{ fontWeight: 700, color: "var(--primary-600)" }}>
            {formatPrice(product.price)}
          </div>
        ))}
      </div>

      {/* Original Price Row */}
      <div className="compare-table__row">
        <div className="compare-table__label">Original Price</div>
        {products.map((product) => (
          <div key={product._id} className="compare-table__value" style={{ textDecoration: "line-through", color: "var(--gray-400)" }}>
            {product.originalPrice ? formatPrice(product.originalPrice) : "-"}
          </div>
        ))}
      </div>

      {/* Brand Row */}
      <div className="compare-table__row">
        <div className="compare-table__label">Brand</div>
        {products.map((product) => (
          <div key={product._id} className="compare-table__value">
            {product.brand || "-"}
          </div>
        ))}
      </div>

      {/* Rating Row */}
      <div className="compare-table__row">
        <div className="compare-table__label">Rating</div>
        {products.map((product) => (
          <div key={product._id} className="compare-table__value">
            {product.rating ? `⭐ ${product.rating.toFixed(1)} (${product.totalRatings})` : "-"}
          </div>
        ))}
      </div>

      {/* Shop Row */}
      <div className="compare-table__row">
        <div className="compare-table__label">Shop</div>
        {products.map((product) => (
          <div key={product._id} className="compare-table__value">
            {product.shop?.name || "-"}
          </div>
        ))}
      </div>

      {/* Specification Rows */}
      {getAllSpecs().map((specKey) => (
        <div key={specKey} className="compare-table__row">
          <div className="compare-table__label">{specKey}</div>
          {products.map((product) => (
            <div key={product._id} className="compare-table__value">
              {getSpecValue(product, specKey)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
