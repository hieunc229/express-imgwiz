"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
/**
 * Check and load cached file if exists
 * @param urlPath file path
 */
function getLocalFile(dir, urlPath) {
    return new Promise(function (resolve, reject) {
        var filePath = getFilePath(dir, urlPath);
        fs_1.default.exists(filePath, function (exist) {
            if (exist) {
                fs_1.default.readFile(filePath, function (err, buffer) {
                    err ? reject(err) : resolve({ buffer: buffer, type: getType(urlPath) });
                });
            }
            else {
                resolve(null);
            }
        });
    });
}
exports.getLocalFile = getLocalFile;
/**
 * Write file to disk
 * @param urlPath file path
 */
function saveLocalFile(dir, urlPath, data) {
    return new Promise(function (resolve, reject) {
        fs_1.default.writeFile(getFilePath(dir, urlPath), data, function (err) {
            err ? reject(err) : resolve();
        });
    });
}
exports.saveLocalFile = saveLocalFile;
function getFilePath(dir, urlPath) {
    return dir + '/' + urlPath.replace(/\//g, '-');
}
function getType(url) {
    var type = url.split(".").pop().toLowerCase();
    // @ts-ignore
    return "image/" + (type in mimeTypes ? mimeTypes[type] : type);
}
var mimeTypes = {
    svg: 'svg+xml',
    jpg: 'jpeg'
};
