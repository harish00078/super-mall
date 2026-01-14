import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FiSearch, FiGrid, FiList, FiX, FiLayers } from "react-icons/fi";
import { productsAPI, categoriesAPI, shopsAPI } from "../services/api";
import ProductCard from "../components/ProductCard";
import CompareProducts from "../components/CompareProducts";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedShop, setSelectedShop] = useState(searchParams.get("shop") || "");
  const [hasOffer, setHasOffer] = useState(searchParams.get("hasOffer") === "true");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "");
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get("minPrice") || "",
    max: searchParams.get("maxPrice") || "",
  });

  // Compare functionality
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedShop, hasOffer, sortBy, search]);

  const fetchFilters = async () => {
    try {
      const [categoriesRes, shopsRes] = await Promise.all([
        categoriesAPI.getAll(),
        shopsAPI.getAll(),
      ]);
      setCategories(categoriesRes.data.data || []);
      setShops(shopsRes.data.data || []);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (selectedShop) params.shop = selectedShop;
      if (hasOffer) params.hasOffer = "true";
      if (sortBy) params.sort = sortBy;
      if (search) params.search = search;
      if (priceRange.min) params.minPrice = priceRange.min;
      if (priceRange.max) params.maxPrice = priceRange.max;

      const response = await productsAPI.getAll(params);
      setProducts(response.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateSearchParams({ search });
    fetchProducts();
  };

  const updateSearchParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedShop("");
    setHasOffer(false);
    setSortBy("");
    setPriceRange({ min: "", max: "" });
    setSearchParams({});
  };

  const toggleCompare = (product) => {
    const isInList = compareList.some((p) => p._id === product._id);
    
    if (isInList) {
      setCompareList(compareList.filter((p) => p._id !== product._id));
    } else if (compareList.length < 4) {
      setCompareList([...compareList, product]);
    }
  };

  const removeFromCompare = (productId) => {
    setCompareList(compareList.filter((p) => p._id !== productId));
  };

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section__header">
          <h1 className="section__title">All Products</h1>
          <p className="section__description">
            Browse and compare products from all shops
          </p>
        </div>

        {/* Compare Bar */}
        {compareList.length > 0 && (
          <div
            style={{
              position: "sticky",
              top: "80px",
              zIndex: 100,
              background: "var(--gradient-primary)",
              borderRadius: "var(--radius-xl)",
              padding: "1rem 1.5rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <FiLayers />
              <span>
                <strong>{compareList.length}</strong> product{compareList.length !== 1 ? "s" : ""} selected for comparison
              </span>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => setShowCompare(true)}
                className="btn btn--sm"
                style={{ background: "white", color: "var(--primary-600)" }}
                disabled={compareList.length < 2}
              >
                Compare Now
              </button>
              <button
                onClick={() => setCompareList([])}
                className="btn btn--sm btn--ghost"
                style={{ color: "white", border: "1px solid rgba(255,255,255,0.5)" }}
              >
                Clear All
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="filters">
          {/* Search */}
          <form onSubmit={handleSearch} className="search-bar" style={{ flex: 1 }}>
            <FiSearch className="search-bar__icon" />
            <input
              type="text"
              className="search-bar__input"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {/* Category Filter */}
          <select
            className="form-select"
            style={{ width: "180px" }}
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              updateSearchParams({ category: e.target.value });
            }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>

          {/* Shop Filter */}
          <select
            className="form-select"
            style={{ width: "180px" }}
            value={selectedShop}
            onChange={(e) => {
              setSelectedShop(e.target.value);
              updateSearchParams({ shop: e.target.value });
            }}
          >
            <option value="">All Shops</option>
            {shops.map((shop) => (
              <option key={shop._id} value={shop._id}>
                {shop.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            className="form-select"
            style={{ width: "180px" }}
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              updateSearchParams({ sort: e.target.value });
            }}
          >
            <option value="">Sort By</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="name">Name</option>
          </select>
        </div>

        {/* Filter Chips */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <button
            className={`filter-chip ${hasOffer ? "filter-chip--active" : ""}`}
            onClick={() => {
              setHasOffer(!hasOffer);
              updateSearchParams({ hasOffer: !hasOffer ? "true" : "" });
            }}
          >
            🏷️ On Offer
          </button>

          {(search || selectedCategory || selectedShop || hasOffer || sortBy) && (
            <button onClick={clearFilters} className="filter-chip" style={{ color: "var(--error)" }}>
              <FiX /> Clear All
            </button>
          )}
        </div>

        {/* Results Count */}
        <p style={{ marginBottom: "1.5rem", color: "var(--gray-500)" }}>
          Showing {products.length} product{products.length !== 1 ? "s" : ""}
        </p>

        {/* Products Grid */}
        <div className="grid grid--4 stagger">
          {loading ? (
            Array(12).fill(0).map((_, i) => (
              <div key={i} className="product-card">
                <div className="skeleton" style={{ height: "200px" }} />
                <div style={{ padding: "20px" }}>
                  <div className="skeleton" style={{ width: "60px", height: "16px", marginBottom: "8px" }} />
                  <div className="skeleton" style={{ width: "100%", height: "20px", marginBottom: "12px" }} />
                  <div className="skeleton" style={{ width: "80px", height: "28px" }} />
                </div>
              </div>
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onCompareToggle={toggleCompare}
                isInCompare={compareList.some((p) => p._id === product._id)}
              />
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem" }}>
              <p style={{ fontSize: "1.25rem", color: "var(--gray-500)", marginBottom: "1rem" }}>
                No products found
              </p>
              <button onClick={clearFilters} className="btn btn--primary">
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Compare Modal */}
        {showCompare && (
          <div
            className="modal-overlay modal-overlay--open"
            onClick={() => setShowCompare(false)}
            style={{ padding: "2rem" }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "1000px",
                width: "100%",
                maxHeight: "90vh",
                overflow: "auto",
                background: "white",
                borderRadius: "var(--radius-2xl)",
                padding: "2rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>Compare Products</h2>
                <button
                  onClick={() => setShowCompare(false)}
                  className="btn btn--ghost btn--icon"
                >
                  <FiX />
                </button>
              </div>

              <CompareProducts
                products={compareList}
                onRemove={removeFromCompare}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
