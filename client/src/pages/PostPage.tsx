import { useState } from "react";
import Container from "../components/Container";
import Header from "../layouts/Header";
import Heading2 from "../components/Headings/Heading2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useDeletePost from "../hooks/useDeletePost";
import { mockPosts } from "../mockposts";
import Anchor from "../components/Anchor";
import Tag from "../components/Tag";
import Button from "../components/Button";
import './PostPage.css';

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const refetch = async (): Promise<void> => {
    // implement actual refetch logic as needed; returning a Promise satisfies the hook's type
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const {
    deleting,
    error: deleteError,
    deletePost,
  } = useDeletePost("http://localhost:3000/posts", postId, refetch);

  const post = mockPosts.find((p) => p.id === postId);

  if (!post)
    return (
      <Container>
        <Header />
        <Heading2>404 Post not found</Heading2>
      </Container>
    );

  function handleDeleteConfirm() {
    setShowDeleteModal(true);
  }

  function handleCancelDelete() {
    setShowDeleteModal(false);
  }

  async function handleConfirmDelete() {
    setShowDeleteModal(false);
    try {
      await deletePost();
      console.log("post deleted");
      navigate("/posts");
    } catch (error) {
      if (error instanceof Error) console.log(deleteError);
      else console.log("unknown error occured");
    }
  }

  return (
    <Container>
      <Header />
      <div className="mb-8">
        <Anchor href="/posts" className="text-sm text-red-500">
          &larr; Back to all posts
        </Anchor>
      </div>

      <Heading2>{post.title}</Heading2>

      <p className="text-sm text-gray-500 mb-2" id="post-metadata-display">
        By {post.author} &middot; Published{" "}
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      <div
        id="post-tags-display"
        className="mb-6 flex flex-wrap gap-2 font-mono"
      >
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div
        className="font-mono text-gray-800 space-y-5 text-left font-500"
        id="post-content-display"
      >
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </div>

      {/* 🔹 Action Buttons */}
      <div className="flex justify-end gap-4 mt-8 pt-4 border-t-2 border-dashed border-gray-300">
        <Button>Edit</Button>
        <Button color="marker-btn-red" onClick={handleDeleteConfirm}>
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>

      {/* 🔹 Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">
              Delete Post?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleCancelDelete}>Cancel</Button>
              <Button color="marker-btn-red" onClick={handleConfirmDelete}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
