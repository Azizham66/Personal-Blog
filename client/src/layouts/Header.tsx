import Heading1 from "../components/Headings/Heading1";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const location = useLocation();
  const { loggedIn } =  useAuth();
  const pathToPage = (path: string) => {
    switch (path) {
      case "/":
        return "home";
      case "/posts":
        return "posts";
      case "/about":
        return "about";
      case "/profile":
        return "profile";
      case "/create-post":
        return "create-post";
      default:
        return "";
    }
  };

  const currentPage = pathToPage(location.pathname);

  const pages = [
    { path: "/", label: "Home", page: "home" },
    { path: "/posts", label: "Posts", page: "posts" },
    { path: "/about", label: "About", page: "about" },
    { path: "/profile", label: "Profile", page: "profile" },
    { path: "/create-post", label: "+ New Post", page: "create-post" },
  ];

  return (
    <header className="mb-8">
      <Heading1>
        &gt; Azizo Blog
        <span className="text-red-500"> (Tech and programming)</span>
      </Heading1>

      <nav className="flex flex-wrap gap-4 text-sm">
        {pages.map((page) => {
          return (
            <Link to={page.path} key={page.path}>
              <Button
                color={
                  currentPage === page.page
                    ? "marker-btn-violet"
                    : "marker-btn-default"
                }
                className = { (!loggedIn && (page.page === "profile" || page.page === "create-post")) ? "hidden" : "" }
              >
                {page.label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
