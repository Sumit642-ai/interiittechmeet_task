import VoteButton from "./VoteButton";
import CollapseToggle from "./CollapseToggle";
import ReplyForm from "./ReplyForm";
import { useComments } from "../../context/CommentsContext";
import { useAuth } from "../../context/AuthContext";
import "./CommentItem.css";

// Helper function to get time ago
const getTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
};

export default function CommentItem({ node, level = 0, collapsedMap }) {
  const { upvote, toggle, reply, users } = useComments();
  const { user } = useAuth();
  const u = users.find(x => x.id === node.user_id);

  const collapsed = !!collapsedMap[node.id];
  const isReply = level > 0;

  return (
    <div className={`comment-item ${isReply ? 'reply' : ''}`}>
      {/* Nesting line for replies */}
      {isReply && (
        <div className="nesting-line">
          <div className="nesting-line-vertical"></div>
          <div className="nesting-line-horizontal"></div>
        </div>
      )}
      
      <div className="comment-card">
        <div className="comment-content">
          {/* Avatar */}
          <div className="comment-avatar">
            {u?.avatar ? (
              <img 
                src={u.avatar} 
                alt={u.name || 'User'} 
                className="avatar-image"
                onError={(e) => {
                  // Fallback to initials if image fails to load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="avatar-circle" style={{ display: u?.avatar ? 'none' : 'flex' }}>
              {u?.name ? u.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
          
          {/* Comment Content */}
          <div className="comment-main">
            {/* User info and timestamp */}
            <div className="comment-header">
              <span className="comment-username">{u?.name ?? "Anonymous User"}</span>
              <span className="comment-timestamp">
                {getTimeAgo(node.created_at)}
              </span>
            </div>
            
            {/* Comment text */}
            <div className="comment-text">
              <p>
                {node.text}
              </p>
            </div>

            {/* Action buttons */}
            <div className="comment-actions">
              <VoteButton onClick={() => upvote(node.id)} count={node.upvotes} />
              <button 
                className="reply-button" 
                onClick={() => toggle(node.id)}
              >
                Reply
              </button>
              {node.children?.length > 0 && (
                <CollapseToggle collapsed={collapsed} onClick={() => toggle(`c_${node.id}`)} />
              )}
            </div>

            {/* Reply form */}
            {collapsedMap[node.id] && user && (
              <div className="reply-form-container">
                <ReplyForm onSubmit={(text) => reply(node.id, text, 1 /*demo user_id*/)} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nested replies */}
      {!collapsedMap[`c_${node.id}`] && node.children?.length > 0 && (
        <div className="nested-comments">
          {node.children.map(ch => (
            <CommentItem key={ch.id} node={ch} level={level+1} collapsedMap={collapsedMap} />
          ))}
        </div>
      )}
    </div>
  );
}
