import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment.jsx";

function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const navigate = useNavigate();

  const fetchInitialComments = async () => {
    try {
      const res = await axios.get(`/api/v1/comment/get-comments/${postId}`);
      if (res.data.success) setAllComments(res.data.data);
    } catch (error) { console.log(error); }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/comment/new-comment`, {
        content: comment,
        userId: currentUser._id,
        postId,
      });
      if (res.data.success) {
        setComment("");
        fetchInitialComments();
      }
    } catch (error) { console.log(error); }
  };

  const handleLike = async (commentId) => {
    if (!currentUser) { navigate("/sign-in"); return; }
    try {
      const res = await axios.patch(`api/v1/comment/like-comment/${commentId}`, { userId: currentUser._id });
      if (res.data.success) fetchInitialComments();
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchInitialComments(); }, [postId]);

  return (
    <div style={{ padding: "2rem 0" }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1.75rem" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--ink)" }}>
          Comments
        </h3>
        <span style={{
          padding: "2px 10px",
          borderRadius: "999px",
          background: "rgba(13,148,136,0.1)",
          color: "var(--teal)",
          fontSize: "0.75rem",
          fontFamily: "'DM Mono', monospace",
        }}>
          {allComments.length}
        </span>
      </div>

      {/* Auth status */}
      {currentUser ? (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", fontSize: "0.8rem", color: "var(--muted)" }}>
          <img src={currentUser.photourl} alt="" style={{ width: "22px", height: "22px", borderRadius: "50%", objectFit: "cover" }} />
          <span>Signed in as</span>
          <Link to="/dashboard?tab=profile" style={{ color: "var(--teal)", textDecoration: "none", fontWeight: 500 }}>
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "0.4rem", fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1rem" }}>
          <span>You must be</span>
          <Link to="/sign-in" style={{ color: "var(--teal)", textDecoration: "underline", textUnderlineOffset: "3px" }}>signed in</Link>
          <span>to comment.</span>
        </div>
      )}

      {/* Comment form */}
      {currentUser && (
        <form
          onSubmit={handleAddComment}
          style={{
            marginBottom: "2rem",
            border: "1.5px solid var(--border)",
            borderRadius: "14px",
            overflow: "hidden",
            background: "var(--card-bg)",
          }}
        >
          <textarea
            placeholder="Share your thoughts…"
            rows="3"
            maxLength="200"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              width: "100%",
              padding: "14px 16px",
              border: "none",
              outline: "none",
              resize: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: "var(--ink)",
              background: "transparent",
              lineHeight: 1.6,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              borderTop: "1px solid var(--border)",
              background: "var(--surface)",
            }}
          >
            <span style={{ fontSize: "0.75rem", fontFamily: "'DM Mono', monospace", color: "var(--muted)" }}>
              {200 - comment.length} chars left
            </span>
            <button
              type="submit"
              style={{
                padding: "7px 18px",
                borderRadius: "999px",
                background: "var(--teal)",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 500,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Post comment
            </button>
          </div>
        </form>
      )}

      {/* Comments list */}
      {allComments.length === 0 ? (
        <p style={{ fontSize: "0.9rem", color: "var(--muted)", textAlign: "center", padding: "2rem 0" }}>
          No comments yet. Be the first!
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {allComments.map((c) => (
            <Comment key={c._id} comment={c} onLike={handleLike} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentSection;
