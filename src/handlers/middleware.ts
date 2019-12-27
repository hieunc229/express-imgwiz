import { Request, Response } from "express";
import { convertImage } from "../lib";
import { lastModifiedFormat } from "../utils";
import { getLocalFile, saveLocalFile } from "../cache";

export default function imgWizMiddleWare(opts?: { staticDir?: string, cacheDir?: string }) {

    let { staticDir, cacheDir } = Object.assign({ route: "/", staticDir: "/" }, opts);

    return async function (req: Request, res: Response, next: Function) {

        if (['png', 'jpg', 'jpeg', 'tiff', 'webp', 'svg'].indexOf(req.path.split('.').pop() as string) !== -1) {

            let cached = false, data: { buffer: Buffer, type: string } | null = null;

            const localFilePath = formatLocalFilePath(req.path.substr(1), req.query);
            if (cacheDir) {
                data = await getLocalFile(cacheDir, localFilePath);
                cached = data !== null;
            };

            if (data === null) {
                data = await convertImage({ path: `${staticDir}${req.path}` }, req.query);
            }

            res.set('Cache-Control', 'public, max-age=31557600');
            res.set('Last-Modified', lastModifiedFormat(new Date()))
            res.status(200).contentType(data.type).end(data.buffer, 'binary');

            cacheDir && !cached && saveLocalFile(cacheDir, localFilePath, data.buffer);
        } else {
            next();
        }
    }
}

/**
 * Format image URL with extension (replace query with dash (-))
 * For example: image-name.jpg?h=190&w=200 => image-name-h=190-w=200.jpg
 * @param url 
 * @param query: tranfrom query (h, w, ...)
 */
function formatLocalFilePath(url: string, query: any) {
    let split = url.split(".");
    let ext = split.pop();
    return `${split.join("-").replace(/\//g, '-')}${Object.keys(query).map((k: string) => k + query[k]).join("-")}.${ext}`
}