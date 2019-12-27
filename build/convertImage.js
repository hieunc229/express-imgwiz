"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
function convertImage(url, opts) {
    return new Promise(function (resolve, reject) {
        getImage(url)
            .then(function (data) {
            var output = sharp_1.default(data);
            if (opts.h || opts.w) {
                var resizeOpts = {};
                opts.fit && (resizeOpts.fit = opts.fit);
                opts.position && (resizeOpts.position = opts.position);
                opts.kernel && (resizeOpts.kernel = opts.kernel);
                opts.enlarge && (resizeOpts.withoutEnlargement = opts.enlarge === "true");
                output = output.resize((opts.w && parseInt(opts.w)) || null, (opts.h && parseInt(opts.h)) || null, resizeOpts);
            }
            var type = opts.fm && ['webp', 'jpg', 'jpeg', 'tiff'].indexOf(opts.fm) !== -1 ? opts.fm : 'webp';
            type === 'jpg' && (type = 'jpeg');
            // @ts-ignore
            output = output[type]({ quality: opts.q ? parseInt(opts.q) : 80 });
            opts.sharpen && (output = output.sharpen.apply(output, 
            // @ts-ignore
            opts.sharpen === "true" ? [undefined, 1, 2] :
                // @ts-ignore
                opts.sharpen.split(",").map(function (v) { return isNaN(v) ? undefined : parseInt(v); })));
            opts.blur && (output = output.blur.apply(output, opts.blur === "true" ? [undefined] : [parseInt(opts.blur)]));
            output.toBuffer().then(function (buffer) {
                resolve({ buffer: buffer, type: "image/" + type });
            });
        })
            .catch(reject);
    });
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
                resolve(Buffer.from(imageData, 'binary'));
            });
        });
    });
}
