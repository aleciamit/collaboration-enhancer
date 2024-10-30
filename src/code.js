"use strict";
/// <reference types="@figma/plugin-typings" />
// Initialize the Figma plugin UI
figma.showUI(__html__, {
    width: 320,
    height: 240
});
// Handle messages from the UI
figma.ui.onmessage = function (msg) {
    if (msg.type === 'update-comments') {
        var updateMsg = msg;
        // Process the comments
        console.log('Updating comments:', updateMsg.comments);
    }
    else if (msg.type === 'error') {
        var errorMsg = msg;
        // Handle the error
        console.error('Error:', errorMsg.message);
    }
    else {
        console.warn('Unknown message type:', msg.type);
    }
};
