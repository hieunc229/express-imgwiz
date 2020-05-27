import { Request, Response } from "express";
import { convertImage } from "../lib";
import { lastModifiedFormat } from "../utils";
import { getLocalFile, saveLocalFile } from "../cache";
import { formatLocalFilePath } from "./utils";

export default function imgWizMiddleWare(opts?: { staticDir?: string, cacheDir?: string }) {

    let { staticDir, cacheDir } = Object.assign({ route: "/", staticDir: "/" }, opts);

    return async function (req: Request, res: Response, next: Function) {


        if (req.method === 'GET') {

            let cached = false, data: { buffer: Buffer, type: string } | null = null;

            try {
                
                let localFilePath = formatLocalFilePath(req.path.substr(1), req.query);

                if (cacheDir && req.query.url) {
                    data = await getLocalFile(cacheDir, localFilePath);
                    cached = data !== null;
                };

                if (data === null) {

                    let { url } = req.query;
                    data = await convertImage({ url,
                        path: url ? undefined : `${staticDir}${req.path}`
                    }, req.query);
                    
                    // Add image extension when the url doesn't include image extension
                    if (localFilePath.indexOf(data.type) === -1) {
                        localFilePath += `.${data.type.replace("image/", '')}`
                    }
                }
        
                res.set('Cache-Control', 'public, max-age=31557600');
                res.set('Last-Modified', lastModifiedFormat(new Date()))
                res.status(200).contentType(data.type).end(data.buffer, 'binary');

                cacheDir && !cached && saveLocalFile(cacheDir, localFilePath, data.buffer);
            } catch (err) {
                res.status(500).end(`Unable to fetch file. Error: ${err.toString()}`)
            }
        } else {
            next();
        }
    }
}

