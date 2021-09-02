import { Response } from "express";
import { convertImage } from "../lib";
import { serveImage } from "./serveImage";
import { formatLocalFilePath } from "./utils";
import { getLocalFile, saveLocalFile } from "../cache";

type RequestOpts = {
    url?: string,
    query: any,
    path: string,
    staticDir?: string,
    cacheDir?: string
}

export default async function handleRequest(opts: RequestOpts, response: Response) {

    const { url, query, path, staticDir, cacheDir } = opts;
    let cached = false, data: { buffer: Buffer, ext: string, mime: string } | null = null;

    // When accessing static file without any transform query,
    // it will look directly to the static directory
    const isAccessStaticFileWithoutQuery = (!url && Object.keys(query).length === 0 && staticDir) as any as boolean;
    const localDir = isAccessStaticFileWithoutQuery ? staticDir : cacheDir;
    const localFilePath = formatLocalFilePath(url || path, query, !isAccessStaticFileWithoutQuery);

    if (localDir && localFilePath) {
        data = await getLocalFile(localDir, localFilePath)
            .catch(error => {
                return Promise.reject(error);
            });
        cached = data !== null;
    };

    if (data === null && !isAccessStaticFileWithoutQuery) {
        data = await convertImage({ url, path: url ? undefined : `${staticDir}/${path}` }, query)
            .catch(error => {
                return Promise.reject(error);
            });
    }

    if (!data) {
        return Promise.reject(`Error: File doesn't exists`);
    }

    serveImage(response, data);

    cacheDir && !cached && saveLocalFile(cacheDir, localFilePath, data.buffer);
}