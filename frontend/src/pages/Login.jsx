import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      toast.success(`Welcome back, ${user.name}!`);
      navigate(user.role === "admin" ? "/admin" : "/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        background: "var(--gray-50)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "white",
          borderRadius: "var(--radius-2xl)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        <div
          style={{
            background: "var(--gradient-primary)",
            padding: "2.5rem",
            textAlign: "center",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              marginBottom: "0.5rem",
            }}
          >
            Welcome Back
          </h1>
          <p style={{ opacity: 0.9 }}>Sign in to continue to Super Mall</p>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn--primary btn--full btn--lg"
            disabled={loading}
            style={{ marginTop: "1rem" }}
          >
            {loading ? "Signing in..." : "Sign In"} <FiArrowRight />
          </button>
          <p
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              color: "var(--gray-500)",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{ color: "var(--primary-600)", fontWeight: 600 }}
            >
              Sign up
            </Link>
          </p>
        </form>
        {/* <div style={{ padding: "1.5rem 2rem", background: "var(--gray-50)", borderTop: "1px solid var(--gray-100)" }}>
          <p style={{ fontSize: "0.875rem", color: "var(--gray-500)" }}>Demo: admin@supermall.com / admin123</p>
        </div> */}
      </div>
    </div>
  );
}
