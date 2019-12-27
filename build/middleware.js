"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lib_1 = require("./lib");
var utils_1 = require("./utils");
function imgWizMiddleWare(opts) {
    var staticDir = Object.assign({ route: "/", staticDir: "/" }, opts).staticDir;
    return function (req, res, next) {
        if (['png', 'jpg', 'jpeg', 'tiff', 'webp', 'svg'].indexOf(req.path.split('.').pop()) !== -1) {
            lib_1.convertImage({ path: "" + staticDir + req.path }, req.query)
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
            next();
        }
    };
}
exports.default = imgWizMiddleWare;
