import "../index.css";
import Container from "../components/Container";
import Header from "../layouts/Header";
import Heading2 from "../components/Headings/Heading2";
import CLI from "../components/CLI";
import Heading3 from "../components/Headings/Heading3";
import { getLatestPosts } from "../utils/getLatestPosts";
import { mockPosts } from "../mockposts";
import PostCard from "../components/PostCard";

export default function Home() {
    const latestPosts = getLatestPosts(mockPosts, 4);

  return (
    <Container>
      <Header />
      <Heading2>Hello World: Welcome to the Scratchpad</Heading2>
      <p className="mb-6 font-mono text-gray-700">
        This is where I dump my thoughts on code, architecture, and why type
        safety is essential and dynamic languages suck. Think of it as a messy,
        caffeine-fueled journal powered by Node.js and TypeScript, where I argue
        with my own functions, debate if Redux is overkill, and suffering at 2
        AM trying to understand what the hell is regex.
      </p>
      <p className="mb-6 font-mono text-gray-700">
        It's not polished, it's not always elegant, but it's real: notes on what
        worked, what broke, and what probably shouldn't exist in production but
        somehow does. A place to capture the chaotic thought process behind
        building things that run, crash, and run again.
      </p>
      <Heading3>Welcome, get started by trying my amazing CLI...</Heading3>
      <CLI />
      <Heading3>...Or reading my latest posts</Heading3>
      <div className="space-y-6">
              {latestPosts.map(({ id, title, tags, createdAt }) => {
                return (
                  <PostCard
                    key={id}
                    id={id}
                    title={title}
                    tags={tags}
                    publishDate={new Date(createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  />
                );
              })}
            </div>
    </Container>
  );
}
