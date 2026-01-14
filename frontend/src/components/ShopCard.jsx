import { Link } from "react-router-dom";
import { FiStar, FiMapPin, FiClock } from "react-icons/fi";

export default function ShopCard({ shop }) {
  const categoryIcon = shop.category?.icon || "🏪";
  const categoryName = shop.category?.name || "Shop";
  const floorName = shop.floor?.name || "Ground Floor";

  return (
    <Link to={`/shops/${shop._id}`} className="shop-card">
      <div className="shop-card__image">
        {categoryIcon}
        {shop.rating > 0 && (
          <div className="shop-card__rating">
            <FiStar />
            {shop.rating.toFixed(1)}
          </div>
        )}
      </div>
      <div className="shop-card__content">
        <span className="shop-card__category">
          {categoryIcon} {categoryName}
        </span>
        <h3 className="shop-card__name">{shop.name}</h3>
        <p className="shop-card__description">
          {shop.description || "Explore amazing products and exclusive offers at this shop."}
        </p>
        <div className="shop-card__meta">
          <span className="shop-card__meta-item">
            <FiMapPin />
            {floorName}
          </span>
          <span className="shop-card__meta-item">
            <FiClock />
            {shop.openingTime || "10:00"} - {shop.closingTime || "21:00"}
          </span>
        </div>
      </div>
    </Link>
  );
}
