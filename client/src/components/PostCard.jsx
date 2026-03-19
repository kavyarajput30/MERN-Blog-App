import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <article
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <Link to={`/post/${post.slug}`} style={{ display: "block", overflow: "hidden" }}>
        <div style={{ height: "200px", overflow: "hidden" }}>
          <img
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
        </div>
      </Link>

      {/* Body */}
      <div style={{ padding: "1.25rem", flexGrow: 1, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {/* Category badge */}
        <span
          style={{
            display: "inline-block",
            padding: "3px 10px",
            borderRadius: "999px",
            background: "rgba(13,148,136,0.1)",
            color: "var(--teal)",
            fontSize: "0.7rem",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            alignSelf: "flex-start",
          }}
        >
          {post.category}
        </span>

        {/* Title */}
        <Link to={`/post/${post.slug}`} style={{ textDecoration: "none" }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.1rem",
              fontWeight: 600,
              lineHeight: 1.35,
              color: "var(--ink)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              margin: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--teal)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--ink)")}
          >
            {post.title}
          </h3>
        </Link>

        {/* Footer row */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "0.75rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
            {new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          <Link
            to={`/post/${post.slug}`}
            style={{
              fontSize: "0.8rem",
              color: "var(--teal)",
              fontWeight: 500,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              transition: "gap 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = "8px")}
            onMouseLeave={(e) => (e.currentTarget.style.gap = "4px")}
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
