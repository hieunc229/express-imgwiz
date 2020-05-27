"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Format image URL with extension (replace query with dash (-))
 * For example: image-name.jpg?h=190&w=200 => image-name-h=190-w=200.jpg
 * @param url
 * @param query: tranfrom query (h, w, ...)
 */
function formatLocalFilePath(_url, query) {
    var _query = query;
    if (!_url && query.url) {
        var url = query.url, rest = __rest(query, ["url"]);
        _query = rest;
        _url = url;
    }
    // URL will remove protocal part
    var split = _url.replace(/([htfps]+:\/\/)/, '').split(".");
    var ext = split.pop();
    return "" + split.join("-").replace(/\//g, '-') + Object.keys(_query || {}).map(function (k) { return k + _query[k]; }).join("-") + "." + ext;
}
exports.formatLocalFilePath = formatLocalFilePath;
