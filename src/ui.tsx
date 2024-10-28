// No need to import React anymore in React 17+ with the new JSX transform!
import FigmaCommentsPlugin from './components/CommentInput/FigmaCommentsPlugin';

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
      <FigmaCommentsPlugin
        onSubmit={handleNewComment}
        placeholder="What's on your mind?"
      />
    </div>
  );
}