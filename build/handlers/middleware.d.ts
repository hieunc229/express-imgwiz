import { Request, Response } from "express";
export default function imgWizMiddleWare(opts?: {
    staticDir?: string;
    cacheDir?: string;
}): (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: Function) => Promise<void>;
