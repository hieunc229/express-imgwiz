import { Response } from "express";
import { formatLocalFilePath } from "./utils";
import { getLocalFile, saveLocalFile } from "../cache";
import { convertImage } from "../lib";
import { lastModifiedFormat } from "../utils";

export default async function handleRequest(opts: {
    url?: string,
    query: any,
    path: string,
    staticDir?: string,
    cacheDir?: string
}, response: Response) {

    const { url, query, path, staticDir, cacheDir } = opts;
    let cached = false, data: { buffer: Buffer, ext: string, mime: string } | null = null;


    let localFilePath = formatLocalFilePath(url || path, query);

    // Use static file when staticDir is specified and no query
    let localDir = !url && staticDir ? staticDir : cacheDir;

    if (localDir && localFilePath) {
        data = await getLocalFile(localDir, localFilePath);
        cached = data !== null;
    };

    if (data === null) {
        data = await convertImage({
            url,
            path: url ? undefined : `${staticDir}/${path}`
        }, query);
    }

    response.set(`Cache-Control', 'public, max-age=${ process.env.EXPRESS_WIZ_CACHE_AGE || 31557600 }`);
    response.set('Last-Modified', lastModifiedFormat(new Date()))
    response.status(200).contentType(data.mime).end(data.buffer, 'binary');

    cacheDir && !cached && saveLocalFile(cacheDir, localFilePath, data.buffer);
}