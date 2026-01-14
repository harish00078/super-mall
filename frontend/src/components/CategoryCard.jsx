import { Link } from "react-router-dom";

export default function CategoryCard({ category, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(category);
    }
  };

  return (
    <div className="category-card" onClick={handleClick}>
      <div className="category-card__icon">
        {category.icon || "🏪"}
      </div>
      <span className="category-card__name">{category.name}</span>
    </div>
  );
}
