import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => { document.title = "Reset Password | Kavya's Blog"; }, []);

  // Password strength calculation
  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#3b82f6", "#0d9488"][strength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    if (form.password !== form.confirm) {
      return setError("Passwords don't match.");
    }

    setLoading(true);
    try {
      const res = await axios.post(`/api/v1/auth/reset-password/${token}`, { password: form.password });
      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => navigate("/sign-in"), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputWrap = { position: "relative" };
  const inputStyle = {
    width: "100%",
    padding: "12px 44px 12px 14px",
    borderRadius: "10px",
    border: "1.5px solid var(--border)",
    background: "var(--surface)",
    color: "var(--ink)",
    fontSize: "0.9rem",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };
  const eyeBtn = {
    position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
    background: "transparent", border: "none", cursor: "pointer", color: "var(--muted)",
    display: "flex", alignItems: "center", padding: 0,
  };
  const labelStyle = {
    display: "block", fontSize: "0.78rem", fontFamily: "'DM Mono', monospace",
    letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "6px",
  };
  const focusIn = e => { e.target.style.borderColor = "var(--teal)"; e.target.style.boxShadow = "0 0 0 3px rgba(13,148,136,0.12)"; };
  const focusOut = e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; };

  const EyeIcon = ({ open }) => open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>

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
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>

          {success ? (
            /* ── Success state ── */
            <div style={{ textAlign: "center" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(13,148,136,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
                Password updated!
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Your password has been reset successfully. Redirecting you to sign in…
              </p>
              <Link
                to="/sign-in"
                style={{ display: "inline-block", padding: "11px 28px", borderRadius: "999px", background: "var(--teal)", color: "white", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.875rem", textDecoration: "none" }}
              >
                Sign In now
              </Link>
            </div>
          ) : (
            /* ── Form state ── */
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>
                Set new password
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1.75rem", lineHeight: 1.6 }}>
                Choose a strong password — at least 6 characters.
              </p>

              {error && (
                <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "8px", marginBottom: "1.25rem" }}>
                  <p style={{ fontSize: "0.85rem", color: "#ef4444", margin: 0 }}>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* New password */}
                <div>
                  <label style={labelStyle}>New Password</label>
                  <div style={inputWrap}>
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      required
                      style={inputStyle}
                      onFocus={focusIn} onBlur={focusOut}
                    />
                    <button type="button" style={eyeBtn} onClick={() => setShowPass(p => !p)}>
                      <EyeIcon open={showPass} />
                    </button>
                  </div>

                  {/* Strength meter */}
                  {form.password && (
                    <div style={{ marginTop: "8px" }}>
                      <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} style={{ flex: 1, height: "4px", borderRadius: "2px", background: i <= strength ? strengthColor : "var(--border)", transition: "background 0.3s" }} />
                        ))}
                      </div>
                      <p style={{ fontSize: "0.72rem", fontFamily: "'DM Mono', monospace", color: strengthColor }}>{strengthLabel}</p>
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label style={labelStyle}>Confirm Password</label>
                  <div style={inputWrap}>
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.confirm}
                      onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                      required
                      style={{
                        ...inputStyle,
                        borderColor: form.confirm && form.password !== form.confirm ? "#ef4444" : "var(--border)",
                      }}
                      onFocus={focusIn} onBlur={focusOut}
                    />
                    <button type="button" style={eyeBtn} onClick={() => setShowConfirm(p => !p)}>
                      <EyeIcon open={showConfirm} />
                    </button>
                  </div>
                  {form.confirm && form.password !== form.confirm && (
                    <p style={{ fontSize: "0.78rem", color: "#ef4444", marginTop: "4px" }}>Passwords don't match</p>
                  )}
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
                    marginTop: "0.25rem",
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
                      Updating…
                    </>
                  ) : "Reset password"}
                </button>
              </form>
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
