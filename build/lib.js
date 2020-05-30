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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
var fs_1 = __importDefault(require("fs"));
var sharp_1 = __importDefault(require("sharp"));
var utils_1 = require("./utils");
function convertImage(source, opts) {
    var _this = this;
    return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
        var imageType, input, imageRequest, output, resizeOpts, type;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    imageType = ((source.url ? source.url : source.path) || "").split(".").pop().toLowerCase();
                    // Remove query incase the given url also contains query
                    if (imageType.indexOf("?")) {
                        imageType = imageType.split("?").shift();
                    }
                    input = source.path;
                    if (!source.url) return [3 /*break*/, 2];
                    return [4 /*yield*/, getImage(source.url)
                            .catch(reject)];
                case 1:
                    imageRequest = _a.sent();
                    if (!imageRequest)
                        return [2 /*return*/];
                    input = imageRequest.data;
                    imageRequest.contentType && (imageType = imageRequest.contentType.replace("image/", ""));
                    _a.label = 2;
                case 2:
                    if (!input) {
                        return [2 /*return*/, reject("Source is undefined")];
                    }
                    // return svg as it is
                    if ((source.url || source.path).split(".").pop() === "svg") {
                        if (typeof input === "string") {
                            try {
                                input = fs_1.default.readFileSync(input);
                            }
                            catch (err) {
                                reject("Error: File doesn't exists");
                                return [2 /*return*/];
                            }
                        }
                        resolve({ buffer: input, mime: "image/svg+xml", ext: "svg" });
                        return [2 /*return*/];
                    }
                    output = sharp_1.default(input);
                    if (opts.h || opts.w) {
                        resizeOpts = {};
                        opts.fit && (resizeOpts.fit = opts.fit);
                        opts.position && (resizeOpts.position = opts.position);
                        opts.kernel && (resizeOpts.kernel = opts.kernel);
                        opts.enlarge && (resizeOpts.withoutEnlargement = opts.enlarge === "true");
                        opts.h && (resizeOpts.height = parseInt(opts.h));
                        opts.w && (resizeOpts.width = parseInt(opts.w));
                        opts.background && (resizeOpts.background = utils_1.extractBackground(opts.background));
                        output = output.resize(resizeOpts);
                    }
                    type = opts.fm && utils_1.SupportedTypes.indexOf(opts.fm) !== -1 ? opts.fm : imageType;
                    type === 'jpg' && (type = 'jpeg');
                    // @ts-ignore
                    output[type] && typeof output[type] === "function" &&
                        // @ts-ignore
                        (output = output[type]({ quality: opts.q ? parseInt(opts.q) : 80 }));
                    opts.sharpen && (output = output.sharpen.apply(output, 
                    // @ts-ignore
                    opts.sharpen === "true" ? [undefined, 1, 2] :
                        // @ts-ignore
                        opts.sharpen.split(",").map(function (v) { return isNaN(v) ? undefined : parseInt(v); })));
                    opts.blur && (output = output.blur.apply(output, opts.blur === "true" ? [undefined] : [parseInt(opts.blur)]));
                    output.toBuffer()
                        .then(function (buffer) {
                        resolve({ buffer: buffer, mime: "image/" + type, ext: type });
                    })
                        .catch(reject);
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.convertImage = convertImage;
function getImage(url) {
    url = decodeURIComponent(url);
    return new Promise(function (resolve, reject) {
        (url.indexOf('https') === 0 ? https_1.default : http_1.default).get(url, function (res) {
            var imageData = '';
            res.setEncoding('binary');
            res.on('data', function (chunk) {
                imageData += chunk;
            });
            res.on('end', function () {
                resolve({
                    data: Buffer.from(imageData, 'binary'),
                    contentType: res.headers["content-type"]
                });
            });
            res.on("error", reject);
        });
    });
}
