import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { document.title = "Forgot Password | Kavya's Blog"; }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", { email });
      if (res.data.success) setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
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

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

        {/* Back link */}
        <Link
          to="/sign-in"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", fontFamily: "'DM Mono', monospace", color: "var(--muted)", textDecoration: "none", marginBottom: "2rem", transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--ink)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
        >
          ← Back to Sign In
        </Link>

        <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "20px", padding: "2rem", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>

          {/* Icon */}
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "rgba(13,148,136,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          {sent ? (
            /* ── Success state ── */
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                Check your inbox
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                We've sent a password reset link to <strong style={{ color: "var(--ink)" }}>{email}</strong>.
                The link expires in <strong style={{ color: "var(--ink)" }}>1 hour</strong>.
              </p>
              <div style={{ padding: "1rem", background: "rgba(13,148,136,0.07)", borderRadius: "10px", marginBottom: "1.5rem" }}>
                <p style={{ fontSize: "0.82rem", color: "var(--teal)", lineHeight: 1.6, margin: 0 }}>
                  💡 Can't find it? Check your spam folder. Gmail users: look in Promotions.
                </p>
              </div>
              <button
                onClick={() => { setSent(false); setEmail(""); }}
                style={{ width: "100%", padding: "11px", borderRadius: "10px", background: "var(--surface)", color: "var(--ink)", border: "1px solid var(--border)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--teal)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
              >
                Try a different email
              </button>
            </div>
          ) : (
            /* ── Form state ── */
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>
                Forgot your password?
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1.75rem", lineHeight: 1.6 }}>
                Enter the email you signed up with and we'll send you a reset link.
              </p>

              {error && (
                <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", marginBottom: "1.25rem" }}>
                  <p style={{ fontSize: "0.85rem", color: "#ef4444", margin: 0 }}>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "6px" }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "var(--teal)"; e.target.style.boxShadow = "0 0 0 3px rgba(13,148,136,0.12)"; }}
                    onBlur={e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
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
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    transition: "opacity 0.2s, transform 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {loading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 0.8s linear infinite" }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      Sending…
                    </>
                  ) : "Send reset link"}
                </button>
              </form>

              <p style={{ marginTop: "1.25rem", fontSize: "0.85rem", color: "var(--muted)", textAlign: "center" }}>
                Remember it?{" "}
                <Link to="/sign-in" style={{ color: "var(--teal)", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
