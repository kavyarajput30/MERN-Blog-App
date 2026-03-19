import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice.js";
import axios from "axios";
import { logoutSuccess } from "../features/user/userSlice.js";

function NavbarPage() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const s = urlParams.get("searchTerm");
    if (s) setSearchTerm(s);
  }, [location.search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogOut = async () => {
    try {
      const res = await axios.get("/api/v1/auth/sign-out");
      if (res.data.success) {
        dispatch(logoutSuccess());
        navigate("/sign-in");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    navigate(`/search?${urlParams.toString()}`);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/project", label: "Projects" },
  ];

  return (
    <header
      style={{
        background: "var(--cream)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s ease",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-1 flex-shrink-0"
          style={{ textDecoration: "none" }}
        >
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "1.3rem",
              color: "var(--ink)",
              letterSpacing: "-0.02em",
            }}
          >
            Kavya's
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: "1.1rem",
              color: "var(--teal)",
              marginLeft: "4px",
            }}
          >
            Blog
          </span>
        </Link>

        {/* Search — desktop */}
        <form onSubmit={handleSubmit} className="hidden lg:flex flex-1 max-w-xs">
          <div style={{ position: "relative", width: "100%" }}>
            <AiOutlineSearch
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--muted)",
                fontSize: "0.95rem",
              }}
            />
            <input
              type="text"
              placeholder="Search posts…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px 8px 36px",
                borderRadius: "999px",
                border: "1px solid var(--border)",
                background: "var(--surface)",
                color: "var(--ink)",
                fontSize: "0.875rem",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--teal)";
                e.target.style.boxShadow = "0 0 0 3px rgba(13,148,136,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
        </form>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: path === to ? 600 : 400,
                color: path === to ? "var(--teal)" : "var(--ink)",
                textDecoration: "none",
                position: "relative",
                paddingBottom: "2px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "var(--teal)")}
              onMouseLeave={(e) =>
                (e.target.style.color = path === to ? "var(--teal)" : "var(--ink)")
              }
            >
              {label}
              {path === to && (
                <span
                  style={{
                    position: "absolute",
                    bottom: "-2px",
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "var(--teal)",
                    borderRadius: "1px",
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--teal)";
              e.currentTarget.style.color = "var(--teal)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--ink)";
            }}
          >
            {theme === "light" ? <FaMoon size={14} /> : <FaSun size={14} />}
          </button>

          {/* User / Sign in */}
          {currentUser ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid var(--teal)",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <img
                  src={currentUser.photourl}
                  alt={currentUser.username}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </button>
              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 8px)",
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    minWidth: "180px",
                    overflow: "hidden",
                    zIndex: 200,
                  }}
                >
                  <div
                    style={{
                      padding: "12px 16px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>
                      @{currentUser.username}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "2px" }}>
                      {currentUser.email}
                    </p>
                  </div>
                  <Link
                    to="/dashboard?tab=profile"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      display: "block",
                      padding: "10px 16px",
                      fontSize: "0.875rem",
                      color: "var(--ink)",
                      textDecoration: "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.target.style.background = "var(--surface)")}
                    onMouseLeave={(e) => (e.target.style.background = "transparent")}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => { setDropdownOpen(false); handleLogOut(); }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "10px 16px",
                      fontSize: "0.875rem",
                      color: "var(--accent)",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/sign-in"
              style={{
                padding: "8px 18px",
                borderRadius: "999px",
                background: "var(--teal)",
                color: "white",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 500,
                textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Sign in
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--ink)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {menuOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--cream)",
            borderTop: "1px solid var(--border)",
            padding: "16px 24px 20px",
          }}
        >
          {/* Mobile search */}
          <form onSubmit={handleSubmit} className="mb-4">
            <div style={{ position: "relative" }}>
              <AiOutlineSearch
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}
              />
              <input
                type="text"
                placeholder="Search posts…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 36px",
                  borderRadius: "999px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  color: "var(--ink)",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
            </div>
          </form>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "10px 0",
                fontSize: "1rem",
                fontWeight: path === to ? 600 : 400,
                color: path === to ? "var(--teal)" : "var(--ink)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default NavbarPage;
