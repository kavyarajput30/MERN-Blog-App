import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from "react-icons/bs";

export default function FooterPage() {
  const socials = [
    { icon: BsGithub, href: "https://github.com/kavyarajput30", label: "GitHub" },
    { icon: BsTwitter, href: "#", label: "Twitter" },
    { icon: BsInstagram, href: "#", label: "Instagram" },
    { icon: BsFacebook, href: "#", label: "Facebook" },
    { icon: BsDribbble, href: "#", label: "Dribbble" },
  ];

  return (
    <footer
      style={{
        background: "var(--ink)",
        color: "var(--cream)",
        padding: "3rem 1.5rem 2rem",
        marginTop: "auto",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "2rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Brand */}
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  color: "white",
                }}
              >
                Kavya's{" "}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "1.2rem",
                  color: "var(--teal)",
                }}
              >
                Blog
              </span>
            </Link>
            <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", maxWidth: "22rem", lineHeight: 1.6 }}>
              Practical insights, tutorials, and real‑world learnings on MERN Stack and Next.js.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "2rem" }}>
            {[
              {
                title: "About",
                links: [
                  { label: "JS Projects", href: "https://github.com/kavyarajput30?tab=repositories", external: true },
                  { label: "Kavya's Blog", href: "/about" },
                ],
              },
              {
                title: "Follow",
                links: [
                  { label: "GitHub", href: "https://github.com/kavyarajput30", external: true },
                  { label: "Discord", href: "#" },
                ],
              },
              {
                title: "Legal",
                links: [
                  { label: "Privacy", href: "#" },
                  { label: "Terms", href: "#" },
                ],
              },
            ].map(({ title, links }) => (
              <div key={title}>
                <p style={{ fontSize: "0.7rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", marginBottom: "0.75rem" }}>
                  {title}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {links.map(({ label, href, external }) => (
                    <a
                      key={label}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => (e.target.style.color = "white")}
                      onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.55)")}
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} Kavya's Blog. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: "rgba(255,255,255,0.35)",
                  transition: "color 0.2s, transform 0.2s",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.1rem",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--teal)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
