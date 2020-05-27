"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var lib_1 = require("../lib");
var utils_1 = require("../utils");
var cache_1 = require("../cache");
var utils_2 = require("./utils");
/**
 * Initiate imgwiz handle. If `cacheDir` is set, it will cache generated image to disk
 * @param opts {
 *    `cacheDir`: Cache directory
 * }
 */
function imgWizandler(opts) {
    var _a = Object.assign({}, opts), cacheDir = _a.cacheDir, staticDir = _a.staticDir;
    return function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, url, opts, cached, data, localFilePath, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, url = _a.url, opts = __rest(_a, ["url"]);
                        if (!url) return [3 /*break*/, 8];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        cached = false, data = null;
                        localFilePath = utils_2.formatLocalFilePath(url, opts);
                        if (!cacheDir) return [3 /*break*/, 3];
                        return [4 /*yield*/, cache_1.getLocalFile(cacheDir, localFilePath)];
                    case 2:
                        data = _b.sent();
                        cached = data !== null;
                        _b.label = 3;
                    case 3:
                        if (!(data === null)) return [3 /*break*/, 5];
                        return [4 /*yield*/, lib_1.convertImage({ url: url }, opts)];
                    case 4:
                        data = _b.sent();
                        // Add image extension when the url doesn't include image extension
                        if (localFilePath.indexOf(data.type) === -1) {
                            localFilePath += "." + data.type.replace("image/", '');
                        }
                        _b.label = 5;
                    case 5:
                        res.set('Cache-Control', 'public, max-age=31557600');
                        res.set('Last-Modified', utils_1.lastModifiedFormat(new Date()));
                        res.status(200).contentType(data.type).end(data.buffer, 'binary');
                        cacheDir && !cached && cache_1.saveLocalFile(cacheDir, localFilePath, data.buffer);
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _b.sent();
                        res.status(500).end("Unable to fetch file. Error: " + err_1.toString());
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        res.status(400).end("Error: Missing \"url\" query");
                        _b.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
}
exports.default = imgWizandler;
