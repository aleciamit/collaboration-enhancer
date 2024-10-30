"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./App.css"); // CSS import for styling
function App() {
    var _a = (0, react_1.useState)(0), count = _a[0], setCount = _a[1];
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("a", { href: "https://vite.dev", target: "_blank", rel: "noopener noreferrer", children: "Vite" }), (0, jsx_runtime_1.jsx)("a", { href: "https://react.dev", target: "_blank", rel: "noopener noreferrer", children: "React" })] }), (0, jsx_runtime_1.jsx)("h1", { children: "Vite + React" }), (0, jsx_runtime_1.jsxs)("div", { className: "card", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: function () { return setCount(function (count) { return count + 1; }); }, children: ["count is ", count] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Edit ", (0, jsx_runtime_1.jsx)("code", { children: "src/App.tsx" }), " and save to test HMR"] })] }), (0, jsx_runtime_1.jsx)("p", { className: "read-the-docs", children: "Click on the Vite and React links to learn more" })] }));
}
exports.default = App;
