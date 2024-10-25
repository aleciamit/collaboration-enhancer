"use strict";
/// <reference types="@figma/plugin-typings" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Initialize plugin with specific dimensions
figma.showUI(__html__, {
    width: 320,
    height: 480,
    themeColors: true,
});
// Store comments in memory
let comments = [];
// Helper functions
function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}
function formatDate(date) {
    return date.toLocaleDateString();
}
// Function to check if user is authenticated
function checkUserAuthentication() {
    if (!figma.currentUser) {
        throw new Error('User not authenticated');
    }
}
// Helper function to get color based on comment role
function getCommentColor(role) {
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
// Function to add a new comment
function addComment(message, role) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Adding comment:', { message, role });
        try {
            const currentUser = figma.currentUser;
            if (!currentUser) {
                throw new Error('User not authenticated');
            }
            if (!message || !role) {
                throw new Error('Message and role are required');
            }
            // Get the selected node if any
            let position = { x: 0, y: 0 };
            if (figma.currentPage.selection.length > 0) {
                const selectedNode = figma.currentPage.selection[0];
                // Position comment near the top-right of the selected element
                position = {
                    x: selectedNode.x + selectedNode.width + 20,
                    y: selectedNode.y
                };
            }
            else {
                // If no element is selected, use viewport center but with slight randomization
                // to prevent overlapping
                const viewportCenter = figma.viewport.center;
                position = {
                    x: viewportCenter.x + (Math.random() * 100 - 50),
                    y: viewportCenter.y + (Math.random() * 100 - 50)
                };
            }
            // Create the comment container frame
            const frame = figma.createFrame();
            frame.name = `Comment: ${role}`;
            frame.resize(200, 100);
            frame.x = position.x;
            frame.y = position.y;
            frame.fills = [{ type: 'SOLID', color: getCommentColor(role), opacity: 0.1 }];
            frame.cornerRadius = 8;
            frame.strokeWeight = 1;
            frame.strokes = [{ type: 'SOLID', color: getCommentColor(role), opacity: 0.3 }];
            // Create the text node inside the frame
            const textNode = figma.createText();
            yield figma.loadFontAsync({ family: "Inter", style: "Regular" });
            textNode.characters = message;
            textNode.fontSize = 12;
            textNode.x = 12;
            textNode.y = 12;
            textNode.textAlignVertical = "TOP";
            textNode.textAutoResize = "HEIGHT";
            textNode.fills = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
            // Create role label
            const roleLabel = figma.createText();
            yield figma.loadFontAsync({ family: "Inter", style: "Medium" });
            roleLabel.characters = role.toUpperCase();
            roleLabel.fontSize = 10;
            roleLabel.x = 12;
            roleLabel.y = frame.height - 24;
            roleLabel.fills = [{ type: 'SOLID', color: getCommentColor(role) }];
            // Add elements to frame
            frame.appendChild(textNode);
            frame.appendChild(roleLabel);
            // Store metadata
            frame.setPluginData('role', role);
            frame.setPluginData('createdAt', new Date().toISOString());
            frame.setPluginData('user', currentUser.name);
            frame.setPluginData('message', message);
            // If there's a selected node, create a connector line
            if (figma.currentPage.selection.length > 0) {
                const selectedNode = figma.currentPage.selection[0];
                const connector = figma.createConnector();
                connector.strokeWeight = 1;
                connector.strokes = [{ type: 'SOLID', color: getCommentColor(role), opacity: 0.5 }];
                // Position connectors
                connector.connectorStart = {
                    position: { x: 1, y: 0.5 }
                };
                connector.connectorEnd = {
                    position: { x: 0, y: 0.5 }
                };
            }
            // Create processed comment object
            const newComment = {
                id: frame.id,
                message,
                role,
                createdAt: formatDate(new Date()),
                user: currentUser.name,
                position
            };
            comments.push(newComment);
            yield figma.clientStorage.setAsync(`comment-${frame.id}-role`, role);
            yield updateUI();
        }
        catch (error) {
            console.error('Error adding comment:', error);
            figma.ui.postMessage({
                type: 'error',
                message: error instanceof Error ? error.message : 'Unknown error occurred'
            });
        }
    });
}
// Function to delete a comment
function deleteComment(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!id) {
                throw new Error('Comment ID is required for deletion');
            }
            // Find and delete the node
            const node = figma.getNodeById(id);
            if (node) {
                // If it's a frame, also delete any connected connectors
                if (node.type === 'FRAME') {
                    const connectors = figma.currentPage.findAll(n => n.type === 'CONNECTOR');
                    connectors.forEach(c => c.remove());
                }
                node.remove();
            }
            // Delete from client storage
            yield figma.clientStorage.deleteAsync(`comment-${id}-role`);
            // Delete from local memory
            comments = comments.filter(comment => comment.id !== id);
            // Update UI
            yield updateUI();
        }
        catch (error) {
            console.error('Error deleting comment:', error);
            figma.ui.postMessage({
                type: 'error',
                message: error instanceof Error ? error.message : 'Failed to delete comment'
            });
        }
    });
}
// Function to sync comments from the canvas
function syncComments() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Starting to sync comments');
            comments = [];
            // Get all frames that have our plugin data
            const commentFrames = figma.currentPage.findAll(node => node.type === 'FRAME' && node.getPluginData('role') !== '');
            for (const frame of commentFrames) {
                try {
                    const role = frame.getPluginData('role');
                    const message = frame.getPluginData('message');
                    if (role && message) {
                        comments.push({
                            id: frame.id,
                            message: message,
                            role: role,
                            createdAt: frame.getPluginData('createdAt') || formatDate(new Date()),
                            user: frame.getPluginData('user') || 'Unknown',
                            position: {
                                x: frame.x,
                                y: frame.y
                            }
                        });
                    }
                }
                catch (nodeError) {
                    console.error(`Error processing frame ${frame.id}:`, nodeError);
                }
            }
            console.log('Processed comments:', comments);
            comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        catch (error) {
            console.error('Error syncing comments:', error);
            throw error;
        }
    });
}
// Function to update the UI
function updateUI() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield syncComments();
            const message = {
                type: 'update-comments',
                comments
            };
            figma.ui.postMessage(message);
        }
        catch (error) {
            console.error('Error in updateUI:', error);
            figma.ui.postMessage({
                type: 'error',
                message: 'Failed to update comments'
            });
        }
    });
}
// Listen for messages from the UI
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        switch (msg.type) {
            case 'add-comment':
                console.log('Received add-comment message:', msg);
                if (!msg.text || !msg.role) {
                    throw new Error('Missing required fields for comment');
                }
                yield addComment(msg.text, msg.role);
                break;
            case 'delete-comment':
                if (!msg.id) {
                    throw new Error('Missing comment ID for deletion');
                }
                yield deleteComment(msg.id);
                break;
            case 'get-comments':
                yield updateUI();
                break;
            default:
                throw new Error(`Unknown message type: ${msg.type}`);
        }
    }
    catch (error) {
        console.error('Error in message handler:', error);
        figma.ui.postMessage({
            type: 'error',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
    }
});
// Load initial comments when plugin starts
updateUI().catch(error => {
    console.error('Error loading initial comments:', error);
    figma.ui.postMessage({
        type: 'error',
        message: 'Failed to load initial comments'
    });
});
