import fs from "fs";
import { Response } from "express";
import { getMime } from "../utils";
import { serveImage } from "./serveImage";

let CACHED_404_IMAGE: {
    buffer: Buffer,
    mime: string
};

/**
 * Handle error by displaying the error message or showing 404 error if EXPRESS_WIZ_404_IMAGE is set
 * @param response: Express handler's response object
 * @param error: Error object
 * @return void
 */
export async function handleError(response: Response, error: Error) {

    // Send a 404 placeholder image if enabled
    if (process.env.EXPRESS_WIZ_404_IMAGE) {
        if (!CACHED_404_IMAGE) {
            let buffer = fs.readFileSync(process.env.EXPRESS_WIZ_404_IMAGE);
            if (!buffer) {
                response.status(500).send(`404! Image not found`);
                return;
            }

            CACHED_404_IMAGE = {
                buffer,
                mime: getMime(process.env.EXPRESS_WIZ_404_IMAGE)
            }
        }
        serveImage(response, CACHED_404_IMAGE);
        return;
    }

    response.status(400)
        .send(`Unable to fetch file. ${error.toString()}`);
}