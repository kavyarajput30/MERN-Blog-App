import React, { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup } from "react-icons/hi";
import { HiChartPie } from "react-icons/hi2";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../features/user/userSlice";
import axios from "axios";

function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) setTab(tabFromUrl);
  }, [location.search]);

  const handleLogOut = async () => {
    try {
      const res = await axios.get("/api/v1/auth/sign-out");
      if (res.data.success) { dispatch(logoutSuccess()); navigate("/sign-in"); }
    } catch (err) { console.log(err); }
  };

  const navItems = [
    { label: "Profile", icon: HiUser, tab: "profile", badge: currentUser?.isAdmin ? "Admin" : "User" },
    ...(currentUser?.isAdmin ? [
      { label: "Dashboard", icon: HiChartPie, tab: "dashboard" },
      { label: "Posts", icon: HiDocumentText, tab: "posts" },
      { label: "Users", icon: HiOutlineUserGroup, tab: "users" },
    ] : []),
  ];

  const itemBase = {
    display: "flex", alignItems: "center", gap: "0.65rem",
    padding: "10px 14px", borderRadius: "10px",
    fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif",
    textDecoration: "none", transition: "background 0.15s, color 0.15s",
    cursor: "pointer", border: "none", width: "100%", textAlign: "left",
  };

  const activeStyle = { background: "rgba(13,148,136,0.12)", color: "var(--teal)", fontWeight: 600 };
  const inactiveStyle = { background: "transparent", color: "var(--muted)" };

  return (
    <aside style={{ width: "100%", padding: "1rem 0.75rem" }}>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.75rem", paddingLeft: "14px" }}>
        Navigation
      </p>

      <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {navItems.map(({ label, icon: Icon, tab: t, badge }) => {
          const isActive = tab === t || (t === "dashboard" && (tab === "" || tab === "dashboard"));
          return (
            <Link
              key={t}
              to={`/dashboard?tab=${t}`}
              style={{ ...itemBase, ...(isActive ? activeStyle : inactiveStyle) }}
              onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.color = "var(--ink)"; } }}
              onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted)"; } }}
            >
              <Icon size={16} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span style={{ fontSize: "0.65rem", fontFamily: "'DM Mono', monospace", padding: "2px 7px", borderRadius: "999px", background: isActive ? "rgba(13,148,136,0.2)" : "var(--surface)", color: isActive ? "var(--teal)" : "var(--muted)" }}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}

        <div style={{ height: "1px", background: "var(--border)", margin: "6px 0" }} />

        <button
          onClick={handleLogOut}
          style={{ ...itemBase, ...inactiveStyle }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(232,93,74,0.08)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--muted)"; }}
        >
          <HiArrowSmRight size={16} />
          Sign out
        </button>
      </nav>
    </aside>
  );
}

export default DashSidebar;
