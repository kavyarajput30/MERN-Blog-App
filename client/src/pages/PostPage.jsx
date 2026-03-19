import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import ReadingProgress from "../components/ReadingProgress";

function PostPage() {
  const { postSlug } = useParams();
  const [post, setPost] = useState({});
  const [recentPosts, setRecentPosts] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    axios.get(`/api/v1/post/get-posts?slug=${postSlug}`)
      .then(res => { if (res.data.success) setPost(res.data.data.posts[0]); })
      .catch(console.log);
    axios.get(`/api/v1/post/get-posts?limit=3`)
      .then(res => { if (res.data.success) setRecentPosts(res.data.data.posts); })
      .catch(console.log);
  }, [postSlug]);

  // ── Dynamic page title ──
  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} | Kavya's Blog`;
    }
    return () => { document.title = "Kavya's Blog"; };
  }, [post?.title]);

  // ── Accurate read time (words ÷ 200 wpm) ──
  const readTime = post.content
    ? Math.max(1, Math.ceil(post.content.replace(/<[^>]+>/g, "").split(/\s+/).filter(Boolean).length / 200))
    : null;

  // ── Share / copy link ──
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <>
      {/* Reading progress bar */}
      <ReadingProgress />

      <div>
        {/* ── Article hero ── */}
        <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "4rem 1.5rem 2rem" }}>

          {post.category && (
            <Link
              to={`/search?category=${post.category}`}
              style={{
                display: "inline-block",
                padding: "4px 14px",
                borderRadius: "999px",
                background: "rgba(13,148,136,0.1)",
                color: "var(--teal)",
                fontSize: "0.72rem",
                fontFamily: "'DM Mono', monospace",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                marginBottom: "1.25rem",
              }}
            >
              {post.category}
            </Link>
          )}

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.9rem, 5vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            marginBottom: "1.5rem",
          }}>
            {post.title}
          </h1>

          {/* Meta row: date · read time · share */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
            {post.createdAt && (
              <span style={{ fontSize: "0.8rem", fontFamily: "'DM Mono', monospace", color: "var(--muted)" }}>
                {new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            )}

            {readTime && (
              <>
                <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--border)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.8rem", fontFamily: "'DM Mono', monospace", color: "var(--muted)" }}>
                  {readTime} min read
                </span>
              </>
            )}

            <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--border)", flexShrink: 0 }} />

            {/* Share button */}
            <button
              onClick={handleShare}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "5px 14px",
                borderRadius: "999px",
                border: copied ? "1px solid var(--teal)" : "1px solid var(--border)",
                background: copied ? "rgba(13,148,136,0.08)" : "transparent",
                color: copied ? "var(--teal)" : "var(--muted)",
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.75rem",
                cursor: "pointer",
                transition: "all 0.2s",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={e => {
                if (!copied) {
                  e.currentTarget.style.borderColor = "var(--teal)";
                  e.currentTarget.style.color = "var(--teal)";
                }
              }}
              onMouseLeave={e => {
                if (!copied) {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--muted)";
                }
              }}
            >
              {copied ? (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                  Share
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Featured image ── */}
        {post.image && (
          <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1rem", marginBottom: "3rem" }}>
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              style={{
                width: "100%",
                maxHeight: "520px",
                objectFit: "cover",
                borderRadius: "16px",
                border: "1px solid var(--border)",
              }}
            />
          </div>
        )}

        {/* ── Article body ── */}
        <div
          className="post-content"
          style={{ maxWidth: "52rem", margin: "0 auto", padding: "0 1.5rem 3rem" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ── CTA ── */}
        <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "0 1.5rem 2rem" }}>
          <CallToAction />
        </div>

        {/* ── Comments ── */}
        <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "0 1.5rem 3rem" }}>
          <CommentSection postId={post._id} />
        </div>

        {/* ── Recent posts ── */}
        {recentPosts.length > 0 && (
          <div style={{ borderTop: "1px solid var(--border)", padding: "3rem 1.5rem 4rem", background: "var(--surface)" }}>
            <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "var(--ink)",
                textAlign: "center",
                marginBottom: "2rem",
                letterSpacing: "-0.01em",
              }}>
                Recent Articles
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
                {recentPosts.map(p => <PostCard key={p._id} post={p} />)}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PostPage;
