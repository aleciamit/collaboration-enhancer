"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
// src/components/CommentInput/FigmaCommentsPlugin.tsx
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var FigmaCommentsPlugin = function (_a) {
    var onSubmit = _a.onSubmit, _b = _a.placeholder, placeholder = _b === void 0 ? "What's on your mind?" : _b;
    var _c = (0, react_1.useState)('ELEMENT'), scope = _c[0], setScope = _c[1];
    var _d = (0, react_1.useState)('FEEDBACK'), commentType = _d[0], setCommentType = _d[1];
    var _e = (0, react_1.useState)(''), comment = _e[0], setComment = _e[1];
    var _f = (0, react_1.useState)(false), isLoading = _f[0], setIsLoading = _f[1];
    var handleSubmit = function () {
        if (comment.trim()) {
            setIsLoading(true);
            onSubmit(comment);
            setComment('');
            setIsLoading(false);
        }
    };
    var commentTypes = {
        QUESTION: { label: 'Question', color: '#2563eb' },
        FEEDBACK: { label: 'Feedback', color: '#16a34a' },
        SUGGESTION: { label: 'Suggestion', color: '#9333ea' }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "w-full max-w-md p-4 bg-white", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-yellow-400 mt-0.5", children: (0, jsx_runtime_1.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { d: "M9.663 17h4.673M12 6.5v-2m0 5.019V12m9-.5c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z", strokeWidth: "2", stroke: "currentColor", fill: "none" }) }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-sm font-semibold text-blue-900 mb-2", children: "Quick Guide" }), (0, jsx_runtime_1.jsxs)("ol", { className: "text-sm text-blue-800 space-y-1 list-decimal ml-4", children: [(0, jsx_runtime_1.jsx)("li", { children: "Select an element (optional)" }), (0, jsx_runtime_1.jsx)("li", { children: "Choose where to place your comment" }), (0, jsx_runtime_1.jsx)("li", { children: "Select comment type" }), (0, jsx_runtime_1.jsx)("li", { children: "Write your message" })] })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "Where would you like to place your comment?" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsxs)("select", { value: scope, onChange: function (e) { return setScope(e.target.value); }, className: "w-full p-2 pl-3 pr-10 bg-gray-50 border border-gray-200 rounded hover:border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none", children: [(0, jsx_runtime_1.jsx)("option", { value: "ELEMENT", children: "On selected element" }), (0, jsx_runtime_1.jsx)("option", { value: "PAGE", children: "On current page" })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none", size: 16 })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: "What type of comment is this?" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("select", { value: commentType, onChange: function (e) { return setCommentType(e.target.value); }, className: "w-full p-2 pl-3 pr-10 bg-gray-50 border border-gray-200 rounded hover:border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none", children: Object.entries(commentTypes).map(function (_a) {
                                    var key = _a[0], _b = _a[1], label = _b.label, color = _b.color;
                                    return ((0, jsx_runtime_1.jsxs)("option", { value: key, className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "w-3 h-3 rounded-full inline-block", style: { backgroundColor: color } }), label] }, key));
                                }) }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none", size: 16 })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("textarea", { value: comment, onChange: function (e) { return setComment(e.target.value); }, placeholder: placeholder, className: "w-full p-3 bg-white border border-gray-200 rounded resize-none h-24 focus:border-blue-500 focus:ring-1 focus:ring-blue-500", maxLength: 500 }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between text-sm mt-1", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-gray-500", children: [500 - comment.length, " characters remaining"] }), (0, jsx_runtime_1.jsx)("button", { onClick: handleSubmit, className: "bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600", disabled: !comment.trim() || isLoading, children: isLoading ? 'Adding...' : 'Add Comment' })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 mb-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-1 relative", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "absolute left-3 top-2.5 text-gray-400", size: 16 }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Search comments...", className: "w-full pl-9 pr-3 py-2 border border-gray-200 rounded" })] }), (0, jsx_runtime_1.jsxs)("button", { className: "p-2 border border-gray-200 rounded inline-flex items-center gap-1 text-gray-700 hover:bg-gray-50", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Filter, { size: 16 }), "Filter"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-3" })] }));
};
exports.default = FigmaCommentsPlugin;
