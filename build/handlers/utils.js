"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Format image URL with extension (replace query with dash (-))
 * For example: image-name.jpg?h=190&w=200 => image-name-h=190-w=200.jpg
 * @param url
 * @param query: tranfrom query (h, w, ...)
 */
function formatLocalFilePath(url, query) {
    // URL will remove protocal part
    var split = url.toLowerCase().replace(/([htfps]+:\/\/)/, '').split(".");
    var ext = split.pop();
    if (ext === 'svg') {
        query = {};
    }
    return "" + split.join("-").replace(/\//g, '-') + Object.keys(query || {}).map(function (k) { return k + query[k]; }).join("-") + (ext ? '.' + ext : '');
}
exports.formatLocalFilePath = formatLocalFilePath;
