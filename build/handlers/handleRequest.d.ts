import { Response } from "express";
export default function handleRequest(opts: {
    url?: string;
    query: any;
    path: string;
    staticDir?: string;
    cacheDir?: string;
}, response: Response): Promise<void>;
