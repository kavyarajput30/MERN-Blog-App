import { useSelector } from "react-redux";

function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div style={{ minHeight: "100vh", background: "var(--cream)", color: "var(--ink)", transition: "background 0.3s, color 0.3s" }}>
        {children}
      </div>
    </div>
  );
}

export default ThemeProvider;
