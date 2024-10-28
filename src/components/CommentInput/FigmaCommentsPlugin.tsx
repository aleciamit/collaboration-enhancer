// src/components/CommentInput/index.tsx
import React, { useState } from 'react';
import './styles.css';

interface CommentInputProps {
  onSubmit: (comment: string) => void;
  placeholder?: string;
  maxLength?: number;
}

const CommentInput: React.FC<CommentInputProps> = ({
  onSubmit,
  placeholder = 'Add a comment...',
  maxLength = 500
}) => {
  const [comment, setComment] = useState('');
  const remainingChars = maxLength - comment.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <div className="comment-input-container">
      <form onSubmit={handleSubmit} className="comment-form">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="comment-textarea"
          rows={3}
        />
        <div className="comment-footer">
          <span className="char-count">
            {remainingChars} characters remaining
          </span>
          <button 
            type="submit"
            disabled={!comment.trim()}
            className="submit-button"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;