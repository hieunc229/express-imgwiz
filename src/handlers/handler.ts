import { Request, Response } from "express";
import { convertImage } from "../lib";
import { lastModifiedFormat } from "../utils";
import { getLocalFile, saveLocalFile } from "../cache";

/**
 * Initiate imgwiz handle. If `cacheDir` is set, it will cache generated image to disk
 * @param opts { 
 *    `cacheDir`: Cache directory
 * }
 */
export default function imgWizandler(opts?: { cacheDir?: string }) {

    let { cacheDir } = Object.assign({}, opts);

    return async function (req: Request, res: Response) {

        let { url, ...opts } = req.query;

        if (url) {
            try {
                let cached = false, data: { buffer: Buffer, type: string } | null = null;
                const localFilePath = formatLocalFilePath(url, opts);

                if (cacheDir) {
                    data = await getLocalFile(cacheDir, localFilePath);
                    cached = data !== null;
                };

                if (data === null) {
                    data = await convertImage({ url }, opts);
                }

                res.set('Cache-Control', 'public, max-age=31557600');
                res.set('Last-Modified', lastModifiedFormat(new Date()))                
                res.status(200).contentType(data.type).end(data.buffer, 'binary');

                cacheDir && !cached && saveLocalFile(cacheDir, localFilePath, data.buffer);

            } catch (err) {
                res.status(500).end(`Unable to fetch file. Error: ${err.toString()}`)
            }
        } else {
            res.status(400).end(`Error: Missing "url" query`)
        }
    }
}

/**
 * Format image URL with extension (remove subdomain, replace query with dash (-))
 * For example: https://sub.domain.com/image-name.jpg?h=190&w=200 => domain.com/image-name-h=190-w=200.jpg
 * @param url: target image url 
 * @param query: tranfrom query (h, w, ...)
 */
function formatLocalFilePath(url: string, query: any) {
    let index = (url.match(/[a-z0-9]+\.[a-z]+\//) || { index: 0 }).index || 0;
    let split = url.substr(index).split("/");
    let domain = split.shift();
    split = split.join("-").split(".")
    let ext = split.pop();
    return `${domain}/${split.join("-").replace(/\//g, '-')}${Object.keys(query).map((k: string) => k + query[k]).join("-")}.${ext}`
}