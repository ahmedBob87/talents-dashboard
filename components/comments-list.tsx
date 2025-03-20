import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCommentsByPostId,
  updateComment,
  deleteComment,
  IComment,
} from "@/redux/slices/comments-slices";
import { RootState } from "@/redux/store";
import { useGetCommentsByPostIdQuery } from "@/redux/api";
import { Button } from "./ui/button";

export default function CommentList({ postId }: { postId: string }) {
  const dispatch = useDispatch();
  const { isLoading, error } = useGetCommentsByPostIdQuery(postId);
  const comments = useSelector((state: RootState) =>
    selectCommentsByPostId(state, Number(postId))
  );
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  if (isLoading)
    return <div className="text-center py-4">Loading comments...</div>;

  if (error)
    return (
      <div className="text-center text-red-500 py-4">
        Error loading comments
      </div>
    );

  const handleEdit = (comment: IComment) => {
    setEditingId(comment.id);
    setEditText(comment.body);
  };

  const handleSaveEdit = () => {
    if (!editingId) return;
    if (editText.trim()) {
      dispatch(updateComment({ id: editingId, body: editText }));
      setEditingId(null);
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      dispatch(deleteComment(id));
    }
  };

  if (comments.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">No comments yet</div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
          {editingId === comment.id ? (
            <div className="space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                rows={3}
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveEdit} className="cursor-pointer">
                  Save
                </Button>
                <Button
                  onClick={() => setEditingId(null)}
                  variant="secondary"
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between">
                <h3 className="font-bold">{comment.name}</h3>
                <div>
                  <Button
                    onClick={() => handleEdit(comment)}
                    variant="ghost"
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    size="sm"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(comment.id)}
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    size="sm"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-gray-500 text-sm">{comment.email}</p>
              <p className="mt-2">{comment.body}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
