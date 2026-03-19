import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value.trim() });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("api/v1/auth/sign-up", data);
      toast.success("Account created successfully");
      setData({ username: "", email: "", password: "" });
      navigate("/sign-in");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1.5px solid var(--border)",
    background: "var(--surface)",
    color: "var(--ink)",
    fontSize: "0.9rem",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.78rem",
    fontFamily: "'DM Mono', monospace",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "6px",
  };

  const focusIn = (e) => { e.target.style.borderColor = "var(--teal)"; e.target.style.boxShadow = "0 0 0 3px rgba(13,148,136,0.12)"; };
  const focusOut = (e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      <div style={{ display: "flex", maxWidth: "800px", width: "100%", gap: "3rem", alignItems: "center", flexWrap: "wrap" }}>

        {/* Left branding */}
        <div style={{ flex: 1, minWidth: "220px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>Kavya's</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1.6rem", color: "var(--teal)", marginTop: "2px" }}>Blog</p>
          </Link>
          <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: "280px" }}>
            Join the community. Get access to weekly tutorials, MERN stack guides, and hands-on project breakdowns.
          </p>
          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {["Weekly MERN articles", "Hands-on JS projects", "Community comments"].map((feat) => (
              <div key={feat} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--teal)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.875rem", color: "var(--muted)" }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div style={{ flex: 1, minWidth: "280px", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "20px", padding: "2rem", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>
            Create account
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1.75rem" }}>It's free and always will be</p>

          <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {[
              { label: "Username", name: "username", type: "text", placeholder: "your_username" },
              { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
              { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label style={labelStyle}>{label}</label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={data[name]}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                  onFocus={focusIn}
                  onBlur={focusOut}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "13px",
                borderRadius: "10px",
                background: loading ? "var(--muted)" : "var(--teal)",
                color: "white",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.95rem",
                fontWeight: 500,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "opacity 0.2s, transform 0.2s",
                marginTop: "0.25rem",
              }}
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {loading ? "Creating account…" : "Sign Up"}
            </button>

            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
              <span style={{ fontSize: "0.75rem", color: "var(--muted)", fontFamily: "'DM Mono', monospace" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            </div>

            <OAuth />
          </form>

          <p style={{ marginTop: "1.25rem", fontSize: "0.85rem", color: "var(--muted)", textAlign: "center" }}>
            Already have an account?{" "}
            <Link to="/sign-in" style={{ color: "var(--teal)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
