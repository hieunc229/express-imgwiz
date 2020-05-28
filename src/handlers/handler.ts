import handleRequest from "./handleRequest";
import { Request, Response } from "express";

/**
 * Initiate imgwiz handle. If `cacheDir` is set, it will cache generated image to disk
 * @param opts { 
 *    `cacheDir`: Enable local caching and set directory
 *    `staticDir`: Enable serving static file and set static directory
 * }
 */
export default function imgWizandler(opts?: { cacheDir?: string, staticDir?: string }) {

    let { cacheDir, staticDir } = Object.assign({}, opts);

    return async function (req: Request, res: Response) {
        try {
            const path = req.params.path;
            const { url, ...query } = req.query;
            handleRequest({ path, staticDir, cacheDir, url, query }, res);
        } catch (err) {
            res.status(500).end(`Unable to fetch file. Error: ${err.toString()}`)
        }
    }
}
