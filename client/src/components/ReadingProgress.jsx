import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "3px", zIndex: 9998, background: "transparent" }}>
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "var(--teal)",
          transition: "width 0.08s linear",
          boxShadow: "0 0 10px rgba(13,148,136,0.5)",
        }}
      />
    </div>
  );
}
