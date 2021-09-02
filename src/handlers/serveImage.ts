import { Response } from "express";
import { lastModifiedFormat } from "../utils";
import fs from "fs";

import { Readable } from "stream";

/**
 * Serve (return) image to the browser
 * @param response: Epxress handler's Response object
 * @param data: Image buffer and mime type
 * @return void
 */
export function serveImage(response: Response, data: { buffer: Buffer, mime: string }) {
    response.set(`Cache-Control', 'public, max-age=${process.env.EXPRESS_WIZ_CACHE_AGE || 31557600}`);
    response.set('Last-Modified', lastModifiedFormat(new Date()))

  response.contentType(data.mime);
    
    let stream = bufferToStream(data.buffer);
    stream.pipe(response);
}


/**
 * @param binary Buffer
 * returns readableInstanceStream Readable
 */
function bufferToStream(binary: Buffer) {

    const readableInstanceStream = new Readable({
      read() {
        this.push(binary);
        this.push(null);
      }
    });

    return readableInstanceStream;
}