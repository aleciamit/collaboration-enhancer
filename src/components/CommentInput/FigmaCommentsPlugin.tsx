// src/components/CommentInput/FigmaCommentsPlugin.tsx
import React, { useState } from 'react';
import { ChevronDown, Filter, Search } from 'lucide-react';

interface FigmaCommentsPluginProps {
  onSubmit: (comment: string) => void;
  placeholder?: string;
}

const FigmaCommentsPlugin: React.FC<FigmaCommentsPluginProps> = ({
  onSubmit,
  placeholder = "What's on your mind?"
}) => {
  const [scope, setScope] = useState('ELEMENT');
  const [commentType, setCommentType] = useState('FEEDBACK');
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (comment.trim()) {
      setIsLoading(true);
      onSubmit(comment);
      setComment('');
      setIsLoading(false);
    }
  };

  const commentTypes = {
    QUESTION: { label: 'Question', color: '#2563eb' },
    FEEDBACK: { label: 'Feedback', color: '#16a34a' },
    SUGGESTION: { label: 'Suggestion', color: '#9333ea' }
  };

  return (
    <div className="w-full max-w-md p-4 bg-white">
      {/* Instructions Panel */}
      <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm">
        <div className="flex gap-3">
          <span className="text-yellow-400 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.663 17h4.673M12 6.5v-2m0 5.019V12m9-.5c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" strokeWidth="2" stroke="currentColor" fill="none"/>
            </svg>
          </span>
          <div>
            <h2 className="text-sm font-semibold text-blue-900 mb-2">Quick Guide</h2>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal ml-4">
              <li>Select an element (optional)</li>
              <li>Choose where to place your comment</li>
              <li>Select comment type</li>
              <li>Write your message</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Comment Location */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Where would you like to place your comment?
        </label>
        <div className="relative">
          <select 
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="w-full p-2 pl-3 pr-10 bg-gray-50 border border-gray-200 rounded hover:border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
          >
            <option value="ELEMENT">On selected element</option>
            <option value="PAGE">On current page</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Comment Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What type of comment is this?
        </label>
        <div className="relative">
          <select 
            value={commentType}
            onChange={(e) => setCommentType(e.target.value)}
            className="w-full p-2 pl-3 pr-10 bg-gray-50 border border-gray-200 rounded hover:border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none"
          >
           {Object.entries(commentTypes).map(([key, value]: [string, { label: string }]) => (
  <option key={key} value={key}>
    {value.label}
  </option>
))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
      </div>

      {/* Comment Input */}
      <div className="mb-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 bg-white border border-gray-200 rounded resize-none h-24 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          maxLength={500}
        />
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-500">{500 - comment.length} characters remaining</span>
          <button 
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600"
            disabled={!comment.trim() || isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Comment'}
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search comments..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded"
          />
        </div>
        <button className="p-2 border border-gray-200 rounded inline-flex items-center gap-1 text-gray-700 hover:bg-gray-50">
          <Filter size={16} />
          Filter
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-3">
        {/* Comment items will be added here */}
      </div>
    </div>
  );
};

export default FigmaCommentsPlugin;