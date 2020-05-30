/// <reference types="node" />
import { Response } from "express";
/**
 * Serve (return) image to the browser
 * @param response: Epxress handler's Response object
 * @param data: Image buffer and mime type
 * @return void
 */
export declare function serveImage(response: Response, data: {
    buffer: Buffer;
    mime: string;
}): void;
