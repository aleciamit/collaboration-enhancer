"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainUI = MainUI;
var jsx_runtime_1 = require("react/jsx-runtime");
var FigmaCommentsPlugin_1 = __importDefault(require("./components/CommentInput/FigmaCommentsPlugin"));
function MainUI() {
    var handleNewComment = function (comment) {
        console.log('New comment received:', comment);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "main-container", children: [(0, jsx_runtime_1.jsx)("h1", { children: "Comments" }), (0, jsx_runtime_1.jsx)(FigmaCommentsPlugin_1.default, { onSubmit: handleNewComment, placeholder: "What's on your mind?" })] }));
}
