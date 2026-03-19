import React, { useState } from "react";
import moment from "moment";
import { FaThumbsUp, FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

function Comment({ comment, onLike }) {
  const { currentUser } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [content, setContent] = useState(comment.content);

  const isLiked = currentUser && comment.likes.includes(currentUser._id);
  const canEdit = currentUser && (currentUser._id === comment.userId._id || currentUser.isAdmin);

  const handleEditSubmit = async () => {
    try {
      const res = await axios.patch(`api/v1/comment/edit-comment/${comment._id}`, { content });
      comment.content = res.data.data.content;
      setIsEditing(false);
    } catch (err) { console.log(err); }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`api/v1/comment/delete-comment/${comment._id}`);
      setShowDeleteModal(false);
    } catch (err) { console.log(err); }
  };

  return (
    <>
      <div style={{ display: "flex", gap: "0.75rem", padding: "1rem 0", borderBottom: "1px solid var(--border)" }}>
        {/* Avatar */}
        <img
          src={comment.userId.photourl}
          alt={comment.userId.username}
          style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
        />

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <span style={{ fontWeight: 600, fontSize: "0.82rem", color: "var(--ink)" }}>
              @{comment.userId.username}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--muted)", fontFamily: "'DM Mono', monospace" }}>
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>

          {isEditing ? (
            <div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="3"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: "1.5px solid var(--teal)",
                  background: "var(--surface)",
                  color: "var(--ink)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.875rem",
                  outline: "none",
                  resize: "none",
                  marginBottom: "0.5rem",
                }}
              />
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={handleEditSubmit}
                  style={{ padding: "6px 14px", borderRadius: "999px", background: "var(--teal)", color: "white", border: "none", cursor: "pointer", fontSize: "0.78rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{ padding: "6px 14px", borderRadius: "999px", background: "var(--surface)", color: "var(--ink)", border: "1px solid var(--border)", cursor: "pointer", fontSize: "0.78rem", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p style={{ fontSize: "0.875rem", color: "var(--muted)", lineHeight: 1.65, marginBottom: "0.6rem" }}>
                {comment.content}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button
                  onClick={() => onLike(comment._id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: isLiked ? "var(--teal)" : "var(--muted)",
                    fontSize: "0.78rem",
                    transition: "color 0.2s",
                    padding: 0,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isLiked ? "var(--teal)" : "var(--muted)")}
                >
                  <FaThumbsUp size={12} />
                  <span>{comment.numberOfLikes} {comment.numberOfLikes === 1 ? "like" : "likes"}</span>
                </button>

                {canEdit && (
                  <>
                    <button
                      onClick={() => { setIsEditing(true); setContent(comment.content); }}
                      style={{ display: "flex", alignItems: "center", gap: "4px", border: "none", background: "transparent", cursor: "pointer", color: "var(--muted)", fontSize: "0.78rem", transition: "color 0.2s", padding: 0 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                    >
                      <FaEdit size={11} /> Edit
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      style={{ display: "flex", alignItems: "center", gap: "4px", border: "none", background: "transparent", cursor: "pointer", color: "var(--muted)", fontSize: "0.78rem", transition: "color 0.2s", padding: 0 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                    >
                      <FaTrash size={11} /> Delete
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete modal */}
      {showDeleteModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "16px", padding: "2rem", maxWidth: "400px", width: "100%", boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>
              Delete comment?
            </h4>
            <p style={{ fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
              This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={handleDelete}
                style={{ flex: 1, padding: "11px", borderRadius: "10px", background: "#ef4444", color: "white", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.875rem" }}
              >
                Yes, delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{ flex: 1, padding: "11px", borderRadius: "10px", background: "var(--surface)", color: "var(--ink)", border: "1px solid var(--border)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Comment;
