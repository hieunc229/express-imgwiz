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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handleRequest_1 = __importDefault(require("./handleRequest"));
var errorHandler_1 = require("./errorHandler");
/**
 * Initiate imgwiz handle. If `cacheDir` is set, it will cache generated image to disk
 * @param opts {
 *    `cacheDir`: Enable local caching and set directory
 *    `staticDir`: Enable serving static file and set static directory
 * }
 * @return void
 */
function imgWizandler(opts) {
    var _a = Object.assign({}, opts), cacheDir = _a.cacheDir, staticDir = _a.staticDir;
    return function (request, response) {
        var path = request.params.path;
        var _a = request.query, url = _a.url, query = __rest(_a, ["url"]);
        handleRequest_1.default({ path: path, staticDir: staticDir, cacheDir: cacheDir, url: url, query: query }, response)
            .catch(function (error) {
            errorHandler_1.handleError(response, error);
        });
    };
}
exports.default = imgWizandler;
