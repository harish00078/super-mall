import { useState } from "react";
import { shopsAPI, productsAPI, offersAPI } from "../services/api";
import toast from "react-hot-toast";

export const ShopForm = ({ onSuccess, onCancel, categories, floors }) => {
  const [formData, setFormData] = useState({
    name: "", description: "", category: "", floor: "", location: "",
    shopNumber: "", contactPhone: "", contactEmail: "", openingTime: "10:00", closingTime: "21:00"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await shopsAPI.create(formData);
      toast.success("Shop created successfully");
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create shop");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-group">
        <label>Shop Name</label>
        <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" />
      </div>
      <div className="form-group">
        <label>Category</label>
        <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="form-select">
          <option value="">Select Category</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Floor</label>
        <select required value={formData.floor} onChange={e => setFormData({...formData, floor: e.target.value})} className="form-select">
          <option value="">Select Floor</option>
          {floors.map(f => <option key={f._id} value={f._id}>{f.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Location / Unit</label>
        <input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="form-input" />
      </div>
      <div className="form-group">
        <label>Shop Number</label>
        <input type="text" required value={formData.shopNumber} onChange={e => setFormData({...formData, shopNumber: e.target.value})} className="form-input" />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input type="tel" value={formData.contactPhone} onChange={e => setFormData({...formData, contactPhone: e.target.value})} className="form-input" placeholder="+91 98765 43210" />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input type="email" value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} className="form-input" placeholder="shop@example.com" />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="form-input" rows="3" />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn--ghost">Cancel</button>
        <button type="submit" className="btn btn--primary">Create Shop</button>
      </div>
    </form>
  );
};

export const ProductForm = ({ onSuccess, onCancel, shops, categories }) => {
  const [formData, setFormData] = useState({
    name: "", description: "", price: "", originalPrice: "",
    category: "", shop: "", brand: "", stock: "10"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await productsAPI.create(formData);
      toast.success("Product created successfully");
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-group">
        <label>Product Name</label>
        <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="form-input" />
      </div>
      <div className="form-group">
        <label>Shop</label>
        <select required value={formData.shop} onChange={e => setFormData({...formData, shop: e.target.value})} className="form-select">
          <option value="">Select Shop</option>
          {shops.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Category</label>
        <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="form-select">
          <option value="">Select Category</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Price (₹)</label>
        <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="form-input" />
      </div>
      <div className="form-group">
        <label>Original Price (₹)</label>
        <input type="number" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})} className="form-input" />
      </div>
      <div className="form-group">
        <label>Brand</label>
        <input type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="form-input" />
      </div>
      <div className="form-group">
        <label>Stock</label>
        <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="form-input" />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="form-input" rows="3" />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn--ghost">Cancel</button>
        <button type="submit" className="btn btn--primary">Create Product</button>
      </div>
    </form>
  );
};

export const OfferForm = ({ onSuccess, onCancel, shops }) => {
  const [formData, setFormData] = useState({
    title: "", description: "", discountType: "percentage", discountValue: "",
    shop: "", startDate: "", endDate: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await offersAPI.create(formData);
      toast.success("Offer created successfully");
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create offer");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-group">
        <label>Offer Title</label>
        <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="form-input" />
      </div>
      <div className="form-group">
        <label>Shop</label>
        <select required value={formData.shop} onChange={e => setFormData({...formData, shop: e.target.value})} className="form-select">
          <option value="">Select Shop</option>
          {shops.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Discount Type</label>
        <select value={formData.discountType} onChange={e => setFormData({...formData, discountType: e.target.value})} className="form-select">
          <option value="percentage">Percentage (%)</option>
          <option value="fixed">Fixed Amount (₹)</option>
        </select>
      </div>
      <div className="form-group">
        <label>Discount Value</label>
        <input type="number" required value={formData.discountValue} onChange={e => setFormData({...formData, discountValue: e.target.value})} className="form-input" />
      </div>
      <div className="form-group">
        <label>Start Date</label>
        <input type="date" required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="form-input" />
      </div>
      <div className="form-group">
        <label>End Date</label>
        <input type="date" required value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="form-input" />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="form-input" rows="3" />
      </div>
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn--ghost">Cancel</button>
        <button type="submit" className="btn btn--primary">Create Offer</button>
      </div>
    </form>
  );
};
