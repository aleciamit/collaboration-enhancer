"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
var client_1 = require("react-dom/client");
require("./styles/global.css"); // Import your global styles
require("./components/CommentInput/styles.css"); // Import your component styles
var ui_1 = require("./ui"); // Import your MainUI component
(0, client_1.createRoot)(document.getElementById('root')).render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(ui_1.MainUI, {}) }));
