import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";

const CATEGORIES = ["uncategorized", "reactjs", "nextjs", "javascript", "nodejs"];

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({ searchTerm: "", sort: "desc", category: "uncategorized" });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    document.title = "Search Posts | Kavya's Blog";
    const urlParams = new URLSearchParams(location.search);
    setSidebarData({
      searchTerm: urlParams.get("searchTerm") || "",
      sort: urlParams.get("sort") || "desc",
      category: urlParams.get("category") || "uncategorized",
    });

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/post/get-posts?${urlParams.toString()}`);
        if (res.data.success) {
          setPosts(res.data.data.posts);
          setShowMore(res.data.data.posts.length === 9);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    setSidebarData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    if (sidebarData.searchTerm) urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", posts.length);
    try {
      const res = await axios.get(`/api/v1/post/get-posts?${urlParams.toString()}`);
      if (res.data.success) {
        setPosts(prev => [...prev, ...res.data.data.posts]);
        setShowMore(res.data.data.posts.length === 9);
      }
    } catch (err) { console.log(err); }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1.5px solid var(--border)",
    background: "var(--surface)",
    color: "var(--ink)",
    fontSize: "0.875rem",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };
  const labelStyle = {
    display: "block",
    fontSize: "0.7rem",
    fontFamily: "'DM Mono', monospace",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: "6px",
  };
  const focusIn = e => { e.target.style.borderColor = "var(--teal)"; e.target.style.boxShadow = "0 0 0 3px rgba(13,148,136,0.12)"; };
  const focusOut = e => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; };

  return (
    <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh", alignItems: "flex-start" }}>

      {/* ── Sidebar filters ── */}
      <aside style={{
        width: "240px",
        flexShrink: 0,
        padding: "2rem 1.25rem",
        borderRight: "1px solid var(--border)",
        position: "sticky",
        top: "64px",
        alignSelf: "flex-start",
        minHeight: "calc(100vh - 64px)",
      }}
        className="hidden md:block"
      >
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.5rem" }}>
          Filter Posts
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label htmlFor="searchTerm" style={labelStyle}>Search</label>
            <div style={{ position: "relative" }}>
              <AiOutlineSearch style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--muted)", fontSize: "0.9rem" }} />
              <input
                id="searchTerm"
                type="text"
                placeholder="Keywords…"
                value={sidebarData.searchTerm}
                onChange={handleChange}
                style={{ ...inputStyle, paddingLeft: "34px" }}
                onFocus={focusIn} onBlur={focusOut}
              />
            </div>
          </div>

          <div>
            <label htmlFor="sort" style={labelStyle}>Sort by</label>
            <select id="sort" value={sidebarData.sort} onChange={handleChange} style={inputStyle} onFocus={focusIn} onBlur={focusOut}>
              <option value="desc">Latest first</option>
              <option value="asc">Oldest first</option>
            </select>
          </div>

          <div>
            <label htmlFor="category" style={labelStyle}>Category</label>
            <select id="category" value={sidebarData.category} onChange={handleChange} style={inputStyle} onFocus={focusIn} onBlur={focusOut}>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            style={{
              padding: "11px",
              borderRadius: "10px",
              background: "var(--teal)",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.875rem",
              marginTop: "0.25rem",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Apply filters
          </button>
        </form>
      </aside>

      {/* ── Results ── */}
      <main style={{ flex: 1, padding: "2rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            fontWeight: 700,
            color: "var(--ink)",
            letterSpacing: "-0.01em",
          }}>
            {sidebarData.searchTerm ? `Results for "${sidebarData.searchTerm}"` : "All Posts"}
          </h1>
          {!loading && (
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "var(--muted)" }}>
              {posts.length} post{posts.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Mobile filter bar */}
        <form onSubmit={handleSubmit} className="md:hidden" style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "140px" }}>
            <AiOutlineSearch style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} />
            <input id="searchTerm" type="text" placeholder="Search…" value={sidebarData.searchTerm} onChange={handleChange}
              style={{ ...inputStyle, paddingLeft: "30px", padding: "8px 10px 8px 30px" }} onFocus={focusIn} onBlur={focusOut} />
          </div>
          <select id="sort" value={sidebarData.sort} onChange={handleChange} style={{ ...inputStyle, width: "auto" }}>
            <option value="desc">Latest</option>
            <option value="asc">Oldest</option>
          </select>
          <select id="category" value={sidebarData.category} onChange={handleChange} style={{ ...inputStyle, width: "auto" }}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="submit" style={{ padding: "8px 16px", borderRadius: "8px", background: "var(--teal)", color: "white", border: "none", cursor: "pointer", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>
            Go
          </button>
        </form>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {loading
            ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
            : posts.length > 0
              ? posts.map(post => <PostCard key={post._id} post={post} />)
              : (
                <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem 0" }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "var(--ink)", marginBottom: "0.5rem" }}>
                    No posts found
                  </p>
                  <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>Try a different search term or category.</p>
                </div>
              )
          }
        </div>

        {showMore && (
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <button
              onClick={handleShowMore}
              style={{
                padding: "12px 32px",
                borderRadius: "999px",
                background: "transparent",
                border: "1.5px solid var(--teal)",
                color: "var(--teal)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--teal)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--teal)"; }}
            >
              Load more posts
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Search;
