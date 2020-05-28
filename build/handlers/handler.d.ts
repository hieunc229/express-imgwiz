import { Request, Response } from "express";
/**
 * Initiate imgwiz handle. If `cacheDir` is set, it will cache generated image to disk
 * @param opts {
 *    `cacheDir`: Enable local caching and set directory
 *    `staticDir`: Enable serving static file and set static directory
 * }
 */
export default function imgWizandler(opts?: {
    cacheDir?: string;
    staticDir?: string;
}): (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response) => Promise<void>;
