import Container from "../components/Container";
import Header from "../layouts/Header";
import Heading2 from "../components/Headings/Heading2";
import PostCard from "../components/PostCard";
import { mockPosts } from "../mockposts";

export default function Posts() {
  return (
    <Container>
      <Header />
      <Heading2>Posts</Heading2>
      <div className="space-y-6">
        {mockPosts.map(({ id, title, tags, createdAt }) => {
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
