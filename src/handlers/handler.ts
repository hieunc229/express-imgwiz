import { Request, Response } from "express";
import { convertImage } from "../lib";
import { lastModifiedFormat } from "../utils";
import { getLocalFile, saveLocalFile } from "../cache";
import { formatLocalFilePath } from "./utils";

/**
 * Initiate imgwiz handle. If `cacheDir` is set, it will cache generated image to disk
 * @param opts { 
 *    `cacheDir`: Cache directory
 * }
 */
export default function imgWizandler(opts?: { cacheDir?: string, staticDir?: string }) {

    let { cacheDir,staticDir } = Object.assign({}, opts);

    return async function (req: Request, res: Response) {

        let { url, ...opts } = req.query;

        if (url) {
            try {
                let cached = false, data: { buffer: Buffer, type: string } | null = null;
                const localFilePath = formatLocalFilePath(url, opts);

                if (cacheDir) {
                    data = await getLocalFile(cacheDir, localFilePath);
                    cached = data !== null;
                }

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
