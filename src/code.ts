/// <reference types="@figma/plugin-typings" />

// Define interfaces for messages and data structures
interface UIMessage {
  type: string;
  role?: string;
  text?: string;
  id?: string;
}

interface ProcessedComment {
  id: string;
  message: string;
  role: string;
  createdAt: string;
  user: string;
  position?: { x: number; y: number };
}

interface ErrorMessage {
  type: 'error';
  message: string;
}

interface UpdateCommentsMessage {
  type: 'update-comments';
  comments: ProcessedComment[];
}

// Initialize the Figma plugin UI
figma.showUI(__html__, {
  width: 320,
  height: 240
});

// Handle messages from the UI
figma.ui.onmessage = (msg: UIMessage) => {
  if (msg.type === 'update-comments') {
    const updateMsg = msg as UpdateCommentsMessage;
    // Process the comments
    console.log('Updating comments:', updateMsg.comments);
  } else if (msg.type === 'error') {
    const errorMsg = msg as ErrorMessage;
    // Handle the error
    console.error('Error:', errorMsg.message);
  } else {
    console.warn('Unknown message type:', msg.type);
  }
};
