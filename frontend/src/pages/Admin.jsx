import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiPackage, FiTag, FiLayers, FiGrid, FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { shopsAPI, productsAPI, categoriesAPI, floorsAPI, offersAPI } from "../services/api";
import toast from "react-hot-toast";

export default function Admin() {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("shops");
  const [data, setData] = useState({ shops: [], products: [], categories: [], floors: [], offers: [] });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    if (!isAdmin()) { navigate("/login"); return; }
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [shops, products, categories, floors, offers] = await Promise.all([
        shopsAPI.getAll(), productsAPI.getAll(), categoriesAPI.getAll(), floorsAPI.getAll(), offersAPI.getAll()
      ]);
      setData({
        shops: shops.data.data || [], products: products.data.data || [],
        categories: categories.data.data || [], floors: floors.data.data || [], offers: offers.data.data || []
      });
    } catch (error) { console.error("Error:", error); } finally { setLoading(false); }
  };

  const handleDelete = async (type, id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const apis = { shops: shopsAPI, products: productsAPI, categories: categoriesAPI, floors: floorsAPI, offers: offersAPI };
      await apis[type].delete(id);
      toast.success("Deleted successfully");
      fetchAllData();
    } catch (error) { toast.error("Delete failed"); }
  };

  const tabs = [
    { id: "shops", label: "Shops", icon: FiShoppingBag },
    { id: "products", label: "Products", icon: FiPackage },
    { id: "categories", label: "Categories", icon: FiGrid },
    { id: "floors", label: "Floors", icon: FiLayers },
    { id: "offers", label: "Offers", icon: FiTag }
  ];

  const renderTable = () => {
    const items = data[activeTab];
    if (loading) return <div className="skeleton" style={{ height: "300px" }} />;
    if (!items.length) return <p style={{ textAlign: "center", padding: "2rem", color: "var(--gray-500)" }}>No {activeTab} found</p>;

    return (
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--gray-50)" }}>
              <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600 }}>Name</th>
              <th style={{ padding: "1rem", textAlign: "left", fontWeight: 600 }}>Details</th>
              <th style={{ padding: "1rem", textAlign: "right", fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} style={{ borderBottom: "1px solid var(--gray-100)" }}>
                <td style={{ padding: "1rem" }}>{item.name || item.title}</td>
                <td style={{ padding: "1rem", color: "var(--gray-500)" }}>
                  {activeTab === "shops" && `Floor: ${item.floor?.name || "N/A"}`}
                  {activeTab === "products" && `₹${item.price}`}
                  {activeTab === "categories" && item.icon}
                  {activeTab === "floors" && `Floor #${item.number}`}
                  {activeTab === "offers" && `${item.discountValue}${item.discountType === "percentage" ? "%" : "₹"} off`}
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <button onClick={() => handleDelete(activeTab, item._id)} className="btn btn--ghost btn--sm" style={{ color: "var(--error)" }}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontSize: "2rem", fontWeight: 800 }}>Admin Dashboard</h1>
            <p style={{ color: "var(--gray-500)" }}>Manage shops, products, offers, and more</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid--5 mb-8" style={{ gap: "1rem" }}>
          {tabs.map((tab) => (
            <div key={tab.id} className="card" style={{ padding: "1.5rem", textAlign: "center", cursor: "pointer", border: activeTab === tab.id ? "2px solid var(--primary-500)" : "2px solid transparent" }} onClick={() => setActiveTab(tab.id)}>
              <tab.icon size={24} style={{ color: "var(--primary-500)", marginBottom: "0.5rem" }} />
              <div style={{ fontSize: "2rem", fontWeight: 800 }}>{data[tab.id].length}</div>
              <div style={{ color: "var(--gray-500)", fontSize: "0.875rem" }}>{tab.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--gray-200)", paddingBottom: "1rem" }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`btn btn--sm ${activeTab === tab.id ? "btn--primary" : "btn--ghost"}`}>
              <tab.icon /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="card" style={{ padding: "1.5rem" }}>
          {renderTable()}
        </div>
      </div>
    </div>
  );
}
