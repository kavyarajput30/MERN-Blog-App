import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
import SkeletonCard from "../components/SkeletonCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Kavya's Blog — MERN Stack & Web Dev";
    axios.get("/api/v1/post/get-posts?limit=6")
      .then(res => { if (res.data.success) setPosts(res.data.data.posts); })
      .catch(console.log)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* ── Hero ── */}
      <section style={{ maxWidth: "56rem", margin: "0 auto", padding: "5rem 1.5rem 3rem" }}>
        <p className="animate-fade-up" style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.75rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--teal)",
          marginBottom: "1.25rem",
        }}>
          Full Stack Developer · MERN Stack
        </p>

        <h1 className="animate-fade-up-1" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          marginBottom: "1.5rem",
        }}>
          Welcome to<br />
          <em style={{ fontStyle: "italic", color: "var(--teal)" }}>Kavya's Blog</em>
        </h1>

        <p className="animate-fade-up-2" style={{
          fontSize: "1.1rem",
          lineHeight: 1.75,
          color: "var(--muted)",
          maxWidth: "42rem",
          marginBottom: "2rem",
        }}>
          I'm Kavya Rajput, a Full Stack Developer with 3 years of industry experience. I specialise
          in the MERN stack, building scalable and user-focused applications — and sharing what I
          learn along the way.
        </p>

        <div className="animate-fade-up-3" style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link
            to="/search"
            style={{
              padding: "12px 28px",
              borderRadius: "999px",
              background: "var(--teal)",
              color: "white",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.9rem",
              textDecoration: "none",
              transition: "opacity 0.2s, transform 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Explore all posts →
          </Link>
          <Link to="/about" style={{ fontSize: "0.9rem", color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: "3px", fontFamily: "'DM Sans', sans-serif" }}>
            About me
          </Link>
        </div>

        <div className="animate-fade-up-4" style={{
          marginTop: "3.5rem",
          height: "1px",
          background: "linear-gradient(90deg, var(--teal) 0%, var(--border) 60%, transparent 100%)",
        }} />
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--surface)", padding: "0 1rem" }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <CallToAction />
        </div>
      </section>

      {/* ── Recent Posts ── */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "4rem 1.5rem 5rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 700,
            color: "var(--ink)",
            letterSpacing: "-0.01em",
          }}>
            Recent Posts
          </h2>
          <Link to="/search" style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            color: "var(--teal)",
            textDecoration: "none",
            textTransform: "uppercase",
          }}>
            View all →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : posts.length > 0
              ? posts.map(post => <PostCard key={post._id} post={post} />)
              : (
                <p style={{ color: "var(--muted)", gridColumn: "1/-1", textAlign: "center", padding: "3rem 0" }}>
                  No posts yet. Check back soon!
                </p>
              )
          }
        </div>
      </section>
    </div>
  );
}

export default Home;
