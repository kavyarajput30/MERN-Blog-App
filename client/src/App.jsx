import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Project from "./pages/Project.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UpdatePost from "./pages/UpdatePost.jsx";
import NavbarPage from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import CreatePost from "./pages/CreatePost.jsx";
import axios from "axios";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx";
import PostPage from "./pages/PostPage.jsx";

function App() {
  axios.defaults.baseURL = "http://localhost:8000";
  axios.defaults.withCredentials = true;
  return (
    <>
      <NavbarPage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />} >
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />

        </Route>
        <Route path="/project" element={<Project />} />
        <Route path="post/:postSlug" element={<PostPage />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
