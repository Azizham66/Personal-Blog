import { Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";
import PostPage from "./pages/PostPage";
import PostForm from "./pages/PostForm";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/create-post" element={<PostForm />} />
        <Route path="/edit-post/:id" element={<PostForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
