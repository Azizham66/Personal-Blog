import Container from "../components/Container";
import Header from "../layouts/Header";
import Heading2 from "../components/Headings/Heading2";
import PostCard from "../components/PostCard";
import { useFetchPosts } from "../hooks/useFetchPosts"; 
import { useEffect } from "react";


export default function Posts() {
  const { posts, loading, error, fetchPosts } = useFetchPosts('http://localhost:5000/api/posts');
  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const interval = setInterval(() => {
      void fetchPosts();
    }, 1_800_000); // every 10s

    return () => clearInterval(interval);
  }, [fetchPosts]);

   if (loading) {
    return (
      <Container>
        <Header />
        <Heading2>Posts</Heading2>
        <p>Loading posts...</p>
      </Container>
    )
  }
  if (error) {
    return (
      <Container>
        <Header />
        <Heading2>Posts</Heading2>
        <p className="text-red-500">Error: {error}</p>
      </Container>
    )
  }

  if (!posts || posts.length === 0) {
    return (
      <Container>
        <Header />
        <Heading2>Posts</Heading2>
        <p>No posts available.</p>
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <Heading2>Posts</Heading2>
      <div className="space-y-6">
        {posts.map(({ _id, title, tags, createdAt }) => {
          return (
            <PostCard
              key={_id}
              id={_id}
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
