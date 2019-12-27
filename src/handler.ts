import { Request, Response } from "express";
import { convertImage } from "./lib";
import { lastModifiedFormat } from "./utils";

export default function imgWizandler(req: Request, res: Response) {

    let { url, ...opts } = req.query;

    if (url) {
        convertImage({ url }, opts)
            .then(data => {
                res.status(200);
                res.contentType(data.type);
                res.set('Cache-Control', 'public, max-age=31557600');
                res.set('Last-Modified', lastModifiedFormat(new Date()))
                res.end(data.buffer, 'binary');
            })
            .catch(err => {
                res.status(400).end(`Error: ${err.toString()}`)
            })
    } else {

        res.status(400).end(`Error: Missing "url" query`)
    }
}