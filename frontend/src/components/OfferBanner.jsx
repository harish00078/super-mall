import { Link } from "react-router-dom";

export default function OfferBanner({ offer }) {
  const formatDiscount = () => {
    if (offer.discountType === "percentage") {
      return `${offer.discountValue}% OFF`;
    }
    return `₹${offer.discountValue} OFF`;
  };

  return (
    <div className="offer-banner">
      <div className="offer-banner__content">
        <span className="offer-banner__tag">Limited Time Offer</span>
        <h3 className="offer-banner__title">{offer.title}</h3>
        <p className="offer-banner__discount">{formatDiscount()}</p>
        <p className="offer-banner__shop">at {offer.shop?.name || "Super Mall"}</p>
      </div>
    </div>
  );
}
