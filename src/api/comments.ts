import type { Comment } from "../types/types";

const API_URL = "http://localhost:3001";

export async function getCommentsByProductId(productId: number): Promise<Comment[]> {
  const response = await fetch(`${API_URL}/comments?productId=${productId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }
  return response.json();
}

export async function addComment(
  comment: Omit<Comment, "id">
): Promise<Comment> {
  const response = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }

  return response.json();
}

export async function deleteComment(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/comments/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }
}
