function About() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "4rem 1.5rem" }}>
      <div style={{ maxWidth: "680px", width: "100%" }}>

        {/* Header */}
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--teal)", marginBottom: "1rem" }}>
          ✦ About
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 6vw, 3rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "2.5rem" }}>
          Kavya Rajput's<br /><em style={{ fontStyle: "italic", color: "var(--teal)" }}>Blog</em>
        </h1>

        {/* Divider */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, var(--teal) 0%, var(--border) 60%, transparent 100%)", marginBottom: "2.5rem" }} />

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {[
            "Welcome to Kavya's Blog! This blog was created by Kavya Rajput as a personal project to share her thoughts and ideas with the world. Kavya is a passionate developer who loves to write about technology, coding, and everything in between.",
            "On this blog, you'll find weekly articles and tutorials on topics such as web development, software engineering, and programming languages. Kavya is always learning and exploring new technologies, so be sure to check back often for new content!",
            "We encourage you to leave comments on our posts and engage with other readers. You can like other people's comments and reply to them as well. We believe that a community of learners can help each other grow and improve.",
          ].map((text, i) => (
            <p
              key={i}
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "var(--muted)",
                paddingLeft: i === 0 ? "1.25rem" : "0",
                borderLeft: i === 0 ? "3px solid var(--teal)" : "none",
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Callout */}
        <div
          style={{
            marginTop: "3rem",
            padding: "1.5rem 1.75rem",
            background: "var(--surface)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--teal)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "1.3rem" }}>
            K
          </div>
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1rem", color: "var(--ink)" }}>Kavya Rajput</p>
            <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "2px" }}>Full Stack Developer · MERN · Next.js</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
