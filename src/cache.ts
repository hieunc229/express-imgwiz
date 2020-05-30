import fs from "fs";
import Filetype from "file-type";
import { SupportedTypes, getMime } from "./utils";

/**
 * Check and load cached file if exists
 * @param dir: local directory path
 * @param urlPath: file path
 */
export function getLocalFile(dir: string, urlPath: string): Promise<{ buffer: Buffer, ext: string, mime: string } | null> {
    return new Promise((resolve, reject) => {
        const filePath = getFilePath(dir, urlPath);
        fs.exists(filePath, exist => {
            if (exist) {
                fs.readFile(filePath, async (err, buffer) => {

                    let mime: string = getMime(urlPath);
                    let ext = mime.replace("images", "");

                    // console.log(dir, urlPath, exist, buffer && buffer.length);

                    if (SupportedTypes.indexOf(ext) === -1) {
                        let ft = await Filetype.fromBuffer(buffer);
                        ft && (ext = ft.ext) && (mime = ft.mime);
                    }

                    err ? reject(err) : resolve({ buffer, ext, mime });
                })
            } else {
                resolve(null);
            }
        })

    })
}

/**
 * Write file to disk
 * @param urlPath file path
 */
export function saveLocalFile(dir: string, urlPath: string, data: Buffer): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.writeFile(getFilePath(dir, urlPath), data, (err) => {
            err ? reject(err) : resolve();
        })
    })
}

function getFilePath(dir: string, urlPath: string) {
    return dir + '/' + urlPath.replace(/\//g, '-');
}

