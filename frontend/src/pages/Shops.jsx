import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiSearch, FiFilter } from "react-icons/fi";
import { shopsAPI, categoriesAPI, floorsAPI } from "../services/api";
import ShopCard from "../components/ShopCard";
import FloorNav from "../components/FloorNav";

export default function Shops() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedFloor, setSelectedFloor] = useState(searchParams.get("floor") || "");

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchShops();
  }, [selectedCategory, selectedFloor, search]);

  const fetchFilters = async () => {
    try {
      const [categoriesRes, floorsRes] = await Promise.all([
        categoriesAPI.getAll(),
        floorsAPI.getAll(),
      ]);
      setCategories(categoriesRes.data.data || []);
      setFloors(floorsRes.data.data || []);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  const fetchShops = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (selectedFloor) params.floor = selectedFloor;
      if (search) params.search = search;

      const response = await shopsAPI.getAll(params);
      setShops(response.data.data || []);
    } catch (error) {
      console.error("Error fetching shops:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFloorChange = (floorId) => {
    setSelectedFloor(floorId || "");
    updateSearchParams({ floor: floorId || "" });
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    updateSearchParams({ category: categoryId });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateSearchParams({ search });
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
    setSelectedFloor("");
    setSearchParams({});
  };

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section__header">
          <h1 className="section__title">Explore All Shops</h1>
          <p className="section__description">
            Discover shops across all categories and floors
          </p>
        </div>

        {/* Floor Navigation */}
        <FloorNav
          floors={floors}
          activeFloor={selectedFloor}
          onFloorChange={handleFloorChange}
        />

        {/* Filters */}
        <div className="filters">
          {/* Search */}
          <form onSubmit={handleSearch} className="search-bar" style={{ flex: 1 }}>
            <FiSearch className="search-bar__icon" />
            <input
              type="text"
              className="search-bar__input"
              placeholder="Search shops..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {/* Category Filter */}
          <select
            className="form-select"
            style={{ width: "200px" }}
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>

          {(search || selectedCategory || selectedFloor) && (
            <button onClick={clearFilters} className="btn btn--ghost">
              Clear Filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <p style={{ marginBottom: "1.5rem", color: "var(--gray-500)" }}>
          Showing {shops.length} shop{shops.length !== 1 ? "s" : ""}
        </p>

        {/* Shops Grid */}
        <div className="grid grid--4 stagger">
          {loading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="shop-card">
                <div className="skeleton" style={{ height: "180px" }} />
                <div style={{ padding: "20px" }}>
                  <div className="skeleton" style={{ width: "80px", height: "24px", marginBottom: "12px" }} />
                  <div className="skeleton" style={{ width: "100%", height: "24px", marginBottom: "8px" }} />
                  <div className="skeleton" style={{ width: "100%", height: "40px" }} />
                </div>
              </div>
            ))
          ) : shops.length > 0 ? (
            shops.map((shop) => (
              <ShopCard key={shop._id} shop={shop} />
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "4rem" }}>
              <p style={{ fontSize: "1.25rem", color: "var(--gray-500)", marginBottom: "1rem" }}>
                No shops found
              </p>
              <button onClick={clearFilters} className="btn btn--primary">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
