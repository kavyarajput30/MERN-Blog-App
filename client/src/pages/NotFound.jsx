import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    document.title = "404 — Page Not Found | Kavya's Blog";
  }, []);

  return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(7rem, 22vw, 13rem)",
        fontWeight: 700,
        lineHeight: 1,
        color: "var(--border)",
        letterSpacing: "-0.04em",
        userSelect: "none",
        margin: 0,
      }}>
        404
      </p>

      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
        fontWeight: 700,
        color: "var(--ink)",
        marginTop: "-0.5rem",
        marginBottom: "0.75rem",
        letterSpacing: "-0.02em",
      }}>
        Page not found
      </h1>

      <p style={{ fontSize: "1rem", color: "var(--muted)", maxWidth: "360px", lineHeight: 1.7, marginBottom: "2.5rem" }}>
        The page you're looking for doesn't exist, or may have been moved.
      </p>

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <Link
          to="/"
          style={{
            padding: "11px 26px",
            borderRadius: "999px",
            background: "var(--teal)",
            color: "white",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: "0.9rem",
            textDecoration: "none",
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          ← Back to Home
        </Link>
        <Link
          to="/search"
          style={{
            padding: "11px 26px",
            borderRadius: "999px",
            background: "transparent",
            color: "var(--ink)",
            border: "1px solid var(--border)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            textDecoration: "none",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "var(--teal)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
        >
          Browse posts
        </Link>
      </div>
    </div>
  );
}
