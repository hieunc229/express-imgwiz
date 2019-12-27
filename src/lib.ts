import sharp from "sharp";
import http from "http";
import https from "https";

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
    blur?: string
}

export function convertImage(source: { url?: string, path?: string, cache?: boolean }, opts: ImageOptions): Promise<{ buffer: Buffer, type: string }> {

    return new Promise(async (resolve, reject) => {

        let imageType = (((source.url ? source.url : source.path) || "").split(".").pop() as string).toLowerCase();

        // Remove query incase the given url also contains query
        if (imageType.indexOf("?")) {
            imageType = imageType.split("?").shift() as string;
        }

        const img = source.url ? await getImage(source.url) : source.path;
        if (!img) {
            return reject(`Source is undefined`);
        }

        let output = sharp(img);

        if (opts.h || opts.w) {
            let resizeOpts: sharp.ResizeOptions = {};

            opts.fit && (resizeOpts.fit = opts.fit);
            opts.position && (resizeOpts.position = opts.position);
            opts.kernel && (resizeOpts.kernel = opts.kernel)
            opts.enlarge && (resizeOpts.withoutEnlargement = opts.enlarge === "true");

            output = output.resize((opts.w && parseInt(opts.w)) || null, (opts.h && parseInt(opts.h)) || null, resizeOpts)
        }

        let type = opts.fm && ['webp', 'jpg', 'jpeg', 'tiff'].indexOf(opts.fm) !== -1 ? opts.fm : imageType;
        type === 'jpg' && (type = 'jpeg');

        // @ts-ignore
        output = (output[type]({ quality: opts.q ? parseInt(opts.q) : 80 }) as Sharp);

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
            resolve({ buffer, type: `image/${type}` });
        })
        .catch(reject)
    })
}

function getImage(url: string): Promise<Buffer> {

    url = decodeURIComponent(url);

    return new Promise((resolve, reject) => {

        (url.indexOf('https') === 0 ? https : http).get(url, (res) => {
            var imageData = '';
            res.setEncoding('binary');

            res.on('data', function (chunk) {
                imageData += chunk;
            });

            res.on('end', function () {
                resolve(Buffer.from(imageData, 'binary'));
            })
        })
    })
}