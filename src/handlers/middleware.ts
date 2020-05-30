import handleRequest from "./handleRequest";
import { Request, Response } from "express";
import { handleError } from "./errorHandler";

export default function imgWizMiddleWare(opts?: { staticDir?: string, cacheDir?: string }) {
    let { staticDir, cacheDir } = Object.assign({ route: "/", staticDir: "/" }, opts);

    return function (reqquest: Request, response: Response) {

        const path = reqquest.path.substr(1);
        const { url, ...query } = reqquest.query;

        handleRequest({ path, staticDir, cacheDir, url, query }, response)
            .catch(error => {
                handleError(response, error);
            })
    }
}

