import { useAuth } from "../context/AuthContext";
import { useComments } from "../context/CommentsContext";
import CommentList from "../components/comments/CommentList";
import "./Post.css";

export default function Post() {
  const { user, logout } = useAuth();
  const { reply } = useComments();

  return (
    <div className="post-container">
      <div className="post-content">
        {/* Header */}
        <header className="post-header">
          <div className="header-content">
            <div className="header-left">
              <h1>Inter IIT Tech Meet</h1>
              <p>Discussion & Comments</p>
            </div>
            <div className="header-right">
              <div className="user-info">
                <p>{user?.name || 'User'}</p>
                <p>{user?.email}</p>
              </div>
              <button 
                onClick={logout} 
                className="logout-button"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Post */}
        <article className="post-article">
          <div className="post-hero">
            <div className="hero-content">
              <h2>Sample Post Title</h2>
              <p>Inter IIT Tech Meet 2024</p>
            </div>
          </div>
          <div className="post-body">
            <h2>Welcome to the Discussion</h2>
            <p>
              This is the main post for our Inter IIT Tech Meet discussion. Share your thoughts, 
              ask questions, and engage with the community through the comments below.
            </p>
            <div className="post-meta">
              <span>📅 Posted 2 hours ago</span>
              <span>👥 1,234 views</span>
              <span>💬 45 comments</span>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <section className="comments-section">
          <div className="comments-header">
            <h3 className="comments-title">Comments</h3>
            <div className="comments-divider"></div>
          </div>
          <CommentList />
        </section>
      </div>
    </div>
  );
}
