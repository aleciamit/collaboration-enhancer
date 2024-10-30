import React from 'react';
import FigmaCommentsPlugin from './components/CommentInput/FigmaCommentsPlugin';

export function MainUI() {
  const handleNewComment = (comment: string) => {
    console.log('New comment received:', comment);
  };

  return (
    <div className="main-container">
      <h1>Comments</h1>
      <FigmaCommentsPlugin
        onSubmit={handleNewComment}
        placeholder="What's on your mind?"
      />
    </div>
  );
}