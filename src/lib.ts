import http from "http";
import https from "https";
import fs from "fs";

import sharp, { Sharp } from "sharp";
import { extractBackground, SupportedTypes } from "./utils";

type ImageOptions = {
    h?: string,
    w?: string,
    crop?: string,
    fm?: string,
    fit?: "cover" | "contain" | "fill" | "inside" | "outside",
    position?: "top" | "right top" | "right" | "right bottom" | "bottom" | "bottom left" | "left top",
    strategy?: "entropy" | "attention",
    gravity?: "north" | "northeast" | "east" | "southeast" | "south" | "southwest" | "west" | "northwest" | "center" | "centre"
    kernel?: "nearest" | "cubic" | "mitchell" | "lanczos2" | "lanczos3",
    enlarge?: string,
    sharpen?: string,
    q?: string,
    blur?: string,
    background?: string
}

export function convertImage(source: { url?: string, path?: string, cache?: boolean }, opts: ImageOptions): Promise<{ buffer: Buffer, ext: string, mime: string }> {

    return new Promise(async (resolve, reject) => {

        let imageType = (((source.url ? source.url : source.path) || "").split(".").pop() as string).toLowerCase();

        // Remove query incase the given url also contains query
        if (imageType.indexOf("?")) {
            imageType = imageType.split("?").shift() as string;
        }

        let input: string | Buffer | undefined = source.path;
        if (source.url) {
            let imageRequest = await getImage(source.url);
            input = imageRequest.data;
            imageRequest.contentType && (imageType = imageRequest.contentType.replace("image/", ""));
        }

        if (!input) {
            return reject(`Source is undefined`);
        }

        // return svg as it is
        if (((source.url || source.path) as string).split(".").pop() === "svg") {
            if (typeof input === "string") {
                input = await fs.readFileSync(input);
            }
            resolve({ buffer: input as Buffer, mime: "image/svg+xml", ext: "svg" });
            return;
        }

        let output = sharp(input);
        let resizeOpts: sharp.ResizeOptions | undefined;

        if (opts.h || opts.w) {
            resizeOpts = {};
            opts.fit && (resizeOpts.fit = opts.fit);
            opts.position && (resizeOpts.position = opts.position);
            opts.kernel && (resizeOpts.kernel = opts.kernel)
            opts.enlarge && (resizeOpts.withoutEnlargement = opts.enlarge === "true");
            opts.h && (resizeOpts.height = parseInt(opts.h));
            opts.w && (resizeOpts.width = parseInt(opts.w));
            opts.background && (resizeOpts.background = extractBackground(opts.background))
            output = output.resize(resizeOpts)
        }
        

        let type = opts.fm && SupportedTypes.indexOf(opts.fm) !== -1 ? opts.fm : imageType;
        type === 'jpg' && (type = 'jpeg');

        // @ts-ignore
        output[type] && typeof output[type] === "function" &&
            // @ts-ignore
            (output = (output[type]({ quality: opts.q ? parseInt(opts.q) : 80 }) as Sharp));

        opts.sharpen && (
            output = output.sharpen.apply(output,
                // @ts-ignore
                opts.sharpen === "true" ? [undefined, 1, 2] :
                    // @ts-ignore
                    opts.sharpen.split(",").map(v => isNaN(v) ? undefined : parseInt(v))
            )
        );

        opts.blur && (output = output.blur.apply(output, opts.blur === "true" ? [undefined] : [parseInt(opts.blur)]));

        output.toBuffer().then((buffer) => {
            resolve({ buffer, mime: `image/${type}`, ext: type });
        })
            .catch(reject)
    })
}

function getImage(url: string): Promise<{ data: Buffer, contentType?: string }> {

    url = decodeURIComponent(url);

    return new Promise((resolve, reject) => {

        (url.indexOf('https') === 0 ? https : http).get(url, (res) => {

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
            })

            res.on("error", reject);
        })
    })
}