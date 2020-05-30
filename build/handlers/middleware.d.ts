import { Request, Response } from "express";
export default function imgWizMiddleWare(opts?: {
    staticDir?: string;
    cacheDir?: string;
}): (reqquest: Request<import("express-serve-static-core").ParamsDictionary>, response: Response) => void;
