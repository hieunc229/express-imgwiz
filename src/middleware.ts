import { Request, Response } from "express";
import { convertImage } from "./lib";
import { lastModifiedFormat } from "./utils";

export default function imgWizMiddleWare(opts?: { route?: string, staticDir?: string }) {

    let { staticDir } = Object.assign({ route: "/", staticDir: "/" }, opts);

    return function (req: Request, res: Response, next: Function) {

        if (['png', 'jpg', 'jpeg', 'tiff', 'webp', 'svg'].indexOf(req.path.split('.').pop() as string) !== -1) {
            convertImage({ path: `${staticDir}${req.path}` }, req.query)
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
            next();
        }
    }
}