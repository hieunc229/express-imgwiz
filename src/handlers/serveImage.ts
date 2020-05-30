import { Response } from "express";
import { lastModifiedFormat } from "../utils";

/**
 * Serve (return) image to the browser
 * @param response: Epxress handler's Response object
 * @param data: Image buffer and mime type
 * @return void
 */
export function serveImage(response: Response, data: { buffer: Buffer, mime: string }) {
    response.set(`Cache-Control', 'public, max-age=${process.env.EXPRESS_WIZ_CACHE_AGE || 31557600}`);
    response.set('Last-Modified', lastModifiedFormat(new Date()))
    response.status(200).contentType(data.mime).end(data.buffer, 'binary');
}