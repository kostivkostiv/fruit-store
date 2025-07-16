import { useState } from "react";
import type { Comment as CommentType } from "../types/types";

type Props = {
  comments: CommentType[];
  onAddComment: (description: string) => void;
  onDeleteComment: (commentId: number) => void;
};

export default function CommentsSection({ comments, onAddComment, onDeleteComment }: Props) {
  const [newComment, setNewComment] = useState("");

  const handleAddClick = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <div className="mt-8 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <ul className="space-y-3">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.id} className="border p-3 rounded-lg shadow-sm flex justify-between items-start">
              <div>
                <p>{comment.description}</p>
                <small className="text-gray-500">{new Date(comment.date).toLocaleString()}</small>
              </div>
              <button
                onClick={() => onDeleteComment(comment.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </ul>
      <div className="mt-6 flex space-x-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddClick()}
          className="w-full border p-2 rounded"
        />
        <button onClick={handleAddClick} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
          Add
        </button>
      </div>
    </div>
  );
}