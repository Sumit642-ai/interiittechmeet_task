import { useComments } from "../../context/CommentsContext";
import CommentItem from "./CommentItem";
import "./CommentList.css";

export default function CommentList() {
  const { tree, collapsed } = useComments();
  
  if (tree.length === 0) {
    return (
      <div className="empty-comments">
        <div className="empty-comments-icon">💬</div>
        <h3 className="empty-comments-title">No comments yet</h3>
        <p className="empty-comments-text">Be the first to start the discussion!</p>
      </div>
    );
  }

  return (
    <div className="comment-list-container">
      {tree.map(n => <CommentItem key={n.id} node={n} collapsedMap={collapsed} />)}
    </div>
  );
}
