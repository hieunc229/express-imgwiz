"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
/**
 * Serve (return) image to the browser
 * @param response: Epxress handler's Response object
 * @param data: Image buffer and mime type
 * @return void
 */
function serveImage(response, data) {
    response.set("Cache-Control', 'public, max-age=" + (process.env.EXPRESS_WIZ_CACHE_AGE || 31557600));
    response.set('Last-Modified', utils_1.lastModifiedFormat(new Date()));
    response.status(200).contentType(data.mime).end(data.buffer, 'binary');
}
exports.serveImage = serveImage;
