import { Request, Response } from "express";
export default function imgWizMiddleWare(opts?: {
    route?: string;
    staticDir?: string;
}): (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response, next: Function) => void;
