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
var lib_1 = require("./lib");
var utils_1 = require("./utils");
function imgWizandler(req, res) {
    var _a = req.query, url = _a.url, opts = __rest(_a, ["url"]);
    if (url) {
        lib_1.convertImage({ url: url }, opts)
            .then(function (data) {
            res.status(200);
            res.contentType(data.type);
            res.set('Cache-Control', 'public, max-age=31557600');
            res.set('Last-Modified', utils_1.lastModifiedFormat(new Date()));
            res.end(data.buffer, 'binary');
        })
            .catch(function (err) {
            res.status(400).end("Error: " + err.toString());
        });
    }
    else {
        res.status(400).end("Error: Missing \"url\" query");
    }
}
exports.default = imgWizandler;
