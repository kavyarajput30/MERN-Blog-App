import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../features/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import OAuth from "../components/OAuth.jsx";
import { toast } from "react-toastify";

function SignIn() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value.trim() });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await axios.post("/api/v1/auth/sign-in", data);
      if (!res.data.success) {
        toast.error(res.data.message);
        dispatch(signInFailure(res.data.message));
        return;
      }
      dispatch(signInSuccess(res.data.data));
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
        dispatch(signInFailure(err.response.data.message));
      }
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

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      <div style={{ display: "flex", maxWidth: "800px", width: "100%", gap: "3rem", alignItems: "center", flexWrap: "wrap" }}>

        {/* Left — branding */}
        <div style={{ flex: 1, minWidth: "220px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>
              Kavya's
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1.6rem", color: "var(--teal)", marginTop: "2px" }}>
              Blog
            </p>
          </Link>
          <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, maxWidth: "280px" }}>
            A personal blog on MERN Stack development. Sign in with your email or Google.
          </p>
          <div style={{ marginTop: "2rem", padding: "1.2rem", background: "var(--surface)", borderRadius: "12px", borderLeft: "3px solid var(--teal)" }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.95rem", color: "var(--ink)", lineHeight: 1.6 }}>
              "Sharing knowledge, one post at a time."
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div
          style={{
            flex: 1,
            minWidth: "280px",
            background: "var(--card-bg)",
            border: "1px solid var(--border)",
            borderRadius: "20px",
            padding: "2rem",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>
            Welcome back
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "1.75rem" }}>
            Sign in to continue
          </p>

          <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={data.email}
                onChange={handleInputChange}
                required
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "var(--teal)"; e.target.style.boxShadow = "0 0 0 3px rgba(13,148,136,0.12)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
              />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={data.password}
                onChange={handleInputChange}
                required
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "var(--teal)"; e.target.style.boxShadow = "0 0 0 3px rgba(13,148,136,0.12)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

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
              onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.opacity="0.85"; e.currentTarget.style.transform="translateY(-1px)"; }}}
              onMouseLeave={(e) => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>

            <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
              <span style={{ fontSize: "0.75rem", color: "var(--muted)", fontFamily: "'DM Mono', monospace" }}>or</span>
              <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            </div>

            <OAuth />
          </form>

          <p style={{ marginTop: "1.25rem", fontSize: "0.85rem", color: "var(--muted)", textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/sign-up" style={{ color: "var(--teal)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
