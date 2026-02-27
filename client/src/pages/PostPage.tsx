import { useEffect, useState } from "react";
import Container from "../components/Container";
import Header from "../layouts/Header";
import Heading2 from "../components/Headings/Heading2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useDeletePost from "../hooks/useDeletePost";
import { Link } from "react-router-dom";
import Tag from "../components/Tag";
import Button from "../components/Button";
import "./styles/PostPage.css";
import "../components/styles/Anchor.css";
import { useFetchPost } from "../hooks/useFetchPost";
import { API_URL } from "../config/api";
import { useAuth } from "../auth/AuthContext";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const postId = id || "";

  const refetch = async (): Promise<void> => {
    // implement actual refetch logic as needed; returning a Promise satisfies the hook's type
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { loggedIn } = useAuth();
  const navigate = useNavigate();
  const {
    deleting,
    deletePost,
  } = useDeletePost(`${API_URL}/api/posts`, postId, refetch);
  const { post, loading, error, fetchPost } = useFetchPost(
    `${API_URL}/api/posts`,
    postId
  );
  useEffect(() => {
    void fetchPost();
  }, [fetchPost]);

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
      // Post successfully deleted
      navigate("/posts");
    } catch (error) {
      if (error instanceof Error) {
        navigate("/error", { state: { error: error.message } });
      } else {
        navigate("/error", { state: { error: "An unknown error occurred while deleting post" } });
      }
    }
  }

  const handleEdit = () => {
    navigate(`/edit-post/${postId}`);
  }

  if (loading) {
    return (
      <Container>
        <Header />
        <Heading2>Loading Post...</Heading2>
      </Container>
    );
  }
  if (error) {
    navigate("/error", { state: { error } });
    return null;
  }

  if (!post)
    return (
      <Container>
        <Header />
        <Heading2>404 Post not found</Heading2>
      </Container>
    );
  return (
    <Container>
      <Header />
      <div className="mb-8">
        <Link to="/posts" className="text-sm text-red-500 primary-link">
          &larr; Back to all posts
        </Link>
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
      {loggedIn &&<div className="flex justify-end gap-4 mt-8 pt-4 border-t-2 border-dashed border-gray-300">
        <Button onClick={handleEdit}>Edit</Button>
        <Button color="marker-btn-red" onClick={handleDeleteConfirm}>
          {deleting ? "Deleting..." : "Delete"}
        </Button>
      </div>}

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
