export default function SkeletonCard() {
  return (
    <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden" }}>
      <div style={{ height: "200px", background: "var(--surface)", position: "relative", overflow: "hidden" }}>
        <Shimmer />
      </div>
      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <Block w="70px" h="20px" radius="999px" />
        <Block w="90%" h="18px" />
        <Block w="65%" h="18px" />
        <div style={{ marginTop: "0.5rem", display: "flex", justifyContent: "space-between" }}>
          <Block w="80px" h="13px" />
          <Block w="45px" h="13px" />
        </div>
      </div>
      <style>{`
        @keyframes sk-shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .sk-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
          animation: sk-shimmer 1.5s infinite;
        }
        .dark .sk-shine {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%);
        }
      `}</style>
    </div>
  );
}

function Block({ w, h, radius = "6px" }) {
  return (
    <div style={{ width: w, height: h, borderRadius: radius, background: "var(--surface)", position: "relative", overflow: "hidden" }}>
      <div className="sk-shine" />
    </div>
  );
}

function Shimmer() {
  return <div className="sk-shine" />;
}
