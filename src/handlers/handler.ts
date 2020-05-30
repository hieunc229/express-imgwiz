import handleRequest from "./handleRequest";
import { Request, Response } from "express";
import { handleError } from "./errorHandler";

/**
 * Initiate imgwiz handle. If `cacheDir` is set, it will cache generated image to disk
 * @param opts { 
 *    `cacheDir`: Enable local caching and set directory
 *    `staticDir`: Enable serving static file and set static directory
 * }
 * @return void
 */
export default function imgWizandler(opts?: { cacheDir?: string, staticDir?: string }) {

    let { cacheDir, staticDir } = Object.assign({}, opts);

    return function (request: Request, response: Response) {

        const path = request.params.path;
        const { url, ...query } = request.query;
        handleRequest({ path, staticDir, cacheDir, url, query }, response)
            .catch(error => {
                handleError(response, error);
            })
    }
}
