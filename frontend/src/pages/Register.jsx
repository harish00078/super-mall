import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    setLoading(true);
    try {
      await register(formData.name, formData.email, formData.password);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - 80px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "var(--gray-50)" }}>
      <div style={{ width: "100%", maxWidth: "440px", background: "white", borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-xl)" }}>
        <div style={{ background: "var(--gradient-primary)", padding: "2.5rem", textAlign: "center", color: "white" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>Create Account</h1>
          <p style={{ opacity: 0.9 }}>Join Super Mall today</p>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-input" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-input" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-input" placeholder="Create a password" value={formData.password} onChange={handleChange} required minLength={6} />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input type="password" name="confirmPassword" className="form-input" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn--primary btn--full btn--lg" disabled={loading} style={{ marginTop: "1rem" }}>
            {loading ? "Creating Account..." : "Create Account"} <FiArrowRight />
          </button>
          <p style={{ textAlign: "center", marginTop: "1.5rem", color: "var(--gray-500)" }}>
            Already have an account? <Link to="/login" style={{ color: "var(--primary-600)", fontWeight: 600 }}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
