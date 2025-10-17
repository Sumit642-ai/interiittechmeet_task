import { useState } from "react";
import "./ReplyForm.css";

export default function ReplyForm({ onSubmit }) {
  const [text, setText] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
      <div className="reply-form-content">
        <input 
          className="reply-input"
          placeholder="Write your reply..." 
          value={text} 
          onChange={e => setText(e.target.value)}
        />
        <button 
          type="submit"
          className="reply-submit-button"
        >
          Reply
        </button>
      </div>
    </form>
  );
}
