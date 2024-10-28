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
  height: 480,
  themeColors: true,  // Match UI with Figma theme
});

// Store comments in memory
let comments: ProcessedComment[] = [];

// Helper: Generate a unique ID for each comment
function generateUniqueId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Helper: Format dates for display
function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

// Check if the user is authenticated before certain actions
function checkUserAuthentication(): void {
  if (!figma.currentUser) {
    throw new Error('User not authenticated');
  }
}

// Helper: Get a color based on the role of the comment
function getCommentColor(role: string): { r: number; g: number; b: number } {
  switch (role.toLowerCase()) {
    case 'question':
      return { r: 0.2, g: 0.4, b: 1 }; // Blue
    case 'feedback':
      return { r: 0.2, g: 0.8, b: 0.4 }; // Green
    case 'suggestion':
      return { r: 0.8, g: 0.4, b: 0.8 }; // Purple
    default:
      return { r: 0.5, g: 0.5, b: 0.5 }; // Gray
  }
}

// Add a new comment to the Figma canvas
async function addComment(message: string, role: string): Promise<void> {
  checkUserAuthentication(); // Ensure user is logged in

  const id = generateUniqueId();
  const position = figma.viewport.center;

  const frame = figma.createFrame();
  frame.resize(200, 100);
  frame.x = position.x;
  frame.y = position.y;
  frame.fills = [{ type: 'SOLID', color: getCommentColor(role), opacity: 0.1 }];

  const textNode = figma.createText();
  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
  textNode.characters = message;
  textNode.fontSize = 12;
  frame.appendChild(textNode);

  const newComment: ProcessedComment = {
    id,
    message,
    role,
    createdAt: formatDate(new Date()),
    user: figma.currentUser?.name || 'Unknown',
    position,
  };

  comments.push(newComment);
  await syncComments(); // Sync comments after adding
  await updateUI(); // Update UI to reflect changes
}

// Delete a comment from the Figma canvas
async function deleteComment(id: string): Promise<void> {
  checkUserAuthentication(); // Ensure user is logged in

  const node = figma.getNodeById(id);
  if (node) node.remove();

  comments = comments.filter(comment => comment.id !== id);
  await syncComments(); // Sync comments after deletion
  await updateUI(); // Update UI to reflect changes
}

// Sync comments from the canvas into local memory
async function syncComments(): Promise<void> {
  const frames = figma.currentPage.findAll(node => node.type === 'FRAME') as FrameNode[];
  comments = frames.map(frame => ({
    id: frame.id,
    message: frame.getPluginData('message'),
    role: frame.getPluginData('role'),
    createdAt: frame.getPluginData('createdAt') || formatDate(new Date()),
    user: frame.getPluginData('user') || 'Unknown',
    position: { x: frame.x, y: frame.y },
  }));
}

// Update the plugin UI with the latest comment data
async function updateUI(): Promise<void> {
  const message: UpdateCommentsMessage = { type: 'update-comments', comments };
  figma.ui.postMessage(message);
}

// Listen for messages from the UI and respond accordingly
figma.ui.onmessage = async (msg: UIMessage) => {
  try {
    switch (msg.type) {
      case 'add-comment':
        if (msg.text && msg.role) {
          await addComment(msg.text, msg.role);
        }
        break;
      case 'delete-comment':
        if (msg.id) {
          await deleteComment(msg.id);
        }
        break;
      case 'get-comments':
        await updateUI();
        break;
      default:
        throw new Error(`Unknown message type: ${msg.type}`);
    }
  } catch (error) {
    console.error('Error handling message:', error);
    figma.ui.postMessage({
      type: 'error',
      message: error instanceof Error ? error.message : 'Unknown error',
    } as ErrorMessage);
  }
};

// Load initial comments when the plugin starts
updateUI().catch(error => {
  console.error('Error loading initial comments:', error);
  figma.ui.postMessage({
    type: 'error',
    message: 'Failed to load comments',
  } as ErrorMessage);
});