import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiLayers } from "react-icons/fi";
import { floorsAPI, shopsAPI } from "../services/api";
import ShopCard from "../components/ShopCard";

export default function Floors() {
  const [floors, setFloors] = useState([]);
  const [shops, setShops] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFloors();
  }, []);

  useEffect(() => {
    if (selectedFloor) {
      fetchShopsByFloor();
    }
  }, [selectedFloor]);

  const fetchFloors = async () => {
    try {
      const response = await floorsAPI.getAll();
      const floorsData = response.data.data || [];
      setFloors(floorsData);
      if (floorsData.length > 0) {
        setSelectedFloor(floorsData[0]);
      }
    } catch (error) {
      console.error("Error fetching floors:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchShopsByFloor = async () => {
    try {
      const response = await shopsAPI.getAll({ floor: selectedFloor._id });
      setShops(response.data.data || []);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section__header">
          <span className="section__eyebrow">
            <FiLayers />
            Mall Directory
          </span>
          <h1 className="section__title">Floor Map</h1>
          <p className="section__description">
            Navigate through our mall floors and discover shops
          </p>
        </div>

        {loading ? (
          <div className="grid grid--4">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: "150px", borderRadius: "var(--radius-xl)" }} />
            ))}
          </div>
        ) : (
          <>
            {/* Floor Cards */}
            <div className="grid grid--4 mb-8">
              {floors.map((floor) => (
                <button
                  key={floor._id}
                  onClick={() => setSelectedFloor(floor)}
                  style={{
                    background: selectedFloor?._id === floor._id ? "var(--gradient-primary)" : "white",
                    color: selectedFloor?._id === floor._id ? "white" : "var(--gray-800)",
                    border: "none",
                    borderRadius: "var(--radius-xl)",
                    padding: "2rem",
                    textAlign: "center",
                    cursor: "pointer",
                    boxShadow: "var(--shadow-card)",
                    transition: "all var(--transition-base)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      fontWeight: 800,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {floor.number}
                  </div>
                  <div style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                    {floor.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      opacity: 0.8,
                      marginTop: "0.5rem",
                    }}
                  >
                    {floor.description}
                  </div>
                </button>
              ))}
            </div>

            {/* Selected Floor Shops */}
            {selectedFloor && (
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                    Shops on {selectedFloor.name}
                  </h2>
                  <span style={{ color: "var(--gray-500)" }}>
                    {shops.length} shop{shops.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {shops.length > 0 ? (
                  <div className="grid grid--4">
                    {shops.map((shop) => (
                      <ShopCard key={shop._id} shop={shop} />
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "4rem",
                      background: "var(--gray-50)",
                      borderRadius: "var(--radius-xl)",
                    }}
                  >
                    <FiMapPin size={48} style={{ color: "var(--gray-300)", marginBottom: "1rem" }} />
                    <p style={{ color: "var(--gray-500)" }}>
                      No shops on this floor yet
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Mall Overview */}
            <div
              style={{
                marginTop: "4rem",
                background: "var(--gradient-dark)",
                borderRadius: "var(--radius-2xl)",
                padding: "3rem",
                color: "white",
              }}
            >
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>
                About Super Mall
              </h3>
              <div className="grid grid--4" style={{ gap: "2rem" }}>
                <div>
                  <div style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                    {floors.length}
                  </div>
                  <div style={{ opacity: 0.8 }}>Floors</div>
                </div>
                <div>
                  <div style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                    100+
                  </div>
                  <div style={{ opacity: 0.8 }}>Shops</div>
                </div>
                <div>
                  <div style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                    1000+
                  </div>
                  <div style={{ opacity: 0.8 }}>Products</div>
                </div>
                <div>
                  <div style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                    50K+
                  </div>
                  <div style={{ opacity: 0.8 }}>Happy Customers</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
