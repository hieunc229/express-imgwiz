import handleRequest from "./handleRequest";
import { Request, Response } from "express";

export default function imgWizMiddleWare(opts?: { staticDir?: string, cacheDir?: string }) {
    let { staticDir, cacheDir } = Object.assign({ route: "/", staticDir: "/" }, opts);
    return async function (req: Request, res: Response) {
        try {
            const path = req.path.substr(1);
            const { url, ...query } = req.query;
            handleRequest({ path, staticDir, cacheDir, url, query }, res);
        } catch (err) {
            res.status(500).end(`Unable to fetch file. Error: ${err.toString()}`)
        }
    }
}

