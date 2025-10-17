import "./VoteButton.css";

export default function VoteButton({ onClick, count }) {
  return (
    <button 
      onClick={onClick} 
      className="vote-button"
    >
      <span className="vote-icon">👍</span>
      <span>{count}</span>
    </button>
  );
}
