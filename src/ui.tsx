import React from 'react';
import CommentInput from './components/CommentInput/FigmaCommentsPlugin';

export function MainUI() {
  // This function will handle new comments
  const handleNewComment = (comment: string) => {
    console.log('New comment received:', comment);
    // For now, we're just logging the comment
    // Later we'll add code to actually save it
  };

  return (
    <div className="main-container">
      <h1>Comments</h1>
      <CommentInput 
        onSubmit={handleNewComment}
        placeholder="What's on your mind?"
      />
    </div>
  );
}