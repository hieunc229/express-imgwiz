import { Response } from "express";
declare type RequestOpts = {
    url?: string;
    query: any;
    path: string;
    staticDir?: string;
    cacheDir?: string;
};
export default function handleRequest(opts: RequestOpts, response: Response): Promise<undefined>;
export {};
