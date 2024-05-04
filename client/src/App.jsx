import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Project from "./pages/Project.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NavbarPage from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <NavbarPage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/project" element={<Project />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
