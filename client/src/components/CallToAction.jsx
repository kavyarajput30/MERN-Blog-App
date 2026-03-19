import React from "react";
import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "2rem",
        padding: "2.5rem",
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        borderRadius: "20px",
        margin: "2rem 0",
        flexWrap: "wrap",
      }}
    >
      {/* Text side */}
      <div style={{ flex: 1, minWidth: "200px" }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", marginBottom: "0.6rem" }}>
          ✦ Learn JavaScript
        </p>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.25, marginBottom: "0.75rem" }}>
          Want to master JavaScript?
        </h3>
        <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.65, marginBottom: "1.25rem" }}>
          Explore 35+ hands-on projects built with vanilla JS, covering everything from DOM manipulation to async patterns.
        </p>
        <a
          href="https://github.com/kavyarajput30?tab=repositories"
          target="_blank"
          rel="noreferrer noopener"
          style={{
            display: "inline-block",
            padding: "11px 24px",
            borderRadius: "999px",
            background: "var(--teal)",
            color: "white",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: "0.875rem",
            textDecoration: "none",
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity="0.85"; e.currentTarget.style.transform="translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="translateY(0)"; }}
        >
          View Projects →
        </a>
      </div>

      {/* Image side */}
      <div style={{ flex: 1, minWidth: "180px", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: "100%", maxWidth: "260px" }}>
          <div style={{ position: "absolute", inset: "-8px", background: "rgba(13,148,136,0.08)", borderRadius: "16px", transform: "rotate(-2deg)" }} />
          <img
            src="https://www.educative.io/api/page/5429180235776000/image/download/5343340281200640"
            alt="JavaScript Projects"
            style={{ width: "100%", borderRadius: "12px", position: "relative", border: "1px solid var(--border)" }}
          />
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
