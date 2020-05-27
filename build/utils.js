"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function lastModifiedFormat(date) {
    return date.toLocaleString("en-us", { weekday: 'short' }) + ", " + date.getDate() + " " + date.toLocaleString("en-us", { month: 'short' }) + " " + date.getFullYear() + " " + date.toLocaleString("en-us", { hour: '2-digit', minute: '2-digit', hour12: false, second: '2-digit' }) + " GTM";
}
exports.lastModifiedFormat = lastModifiedFormat;
// Get backgroundcolor value
// Return hex as string or rgba as object
// Example: #000000 => hex, (0,0,0,.4) => rgba
function extractBackground(value) {
    if (value[0] === '(') {
        var _a = value
            .substr(1, value.length - 2).split(",")
            .map(function (out) { return parseFloat(out); }), r = _a[0], g = _a[1], b = _a[2], alpha = _a[3];
        return { r: r, g: g, b: b, alpha: alpha };
    }
    return value;
}
exports.extractBackground = extractBackground;
