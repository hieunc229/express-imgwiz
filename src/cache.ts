import fs from "fs";
// import mkdirp from "mkdirp";
import Filetype from "file-type";
// import path from "path";
import { SupportedTypes, getMime, getExt } from "./utils";

// NOTE: the comment outed code blocks attemp to use `mkdirp` to create sub-directory.
// But to avoid unnecessary steps and extra 3rd-party library, the cache file format will flatout
// For example: static/sub-dir/file.png -> static/sub-dir-file.png

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

                    let mime = getMime(urlPath);
                    let ext = getExt(urlPath) ;

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
    return new Promise(async (resolve, reject) => {

        // Check if the location is a sub directory
        // if (urlPath.split("/").length > 1) {
        //     // Create sub directory if not eixts
        //     await checkDirExist(getFilePath(dir, urlPath)).catch(err => {
        //         reject(err);
        //         return;
        //     })
        // }

        fs.writeFile(getFilePath(dir, urlPath), data, (err) => {
            err ? reject(err) : resolve();
        })
    })
}

// function checkDirExist(dir: string) {
//     return mkdirp(path.dirname(dir));
// }

function getFilePath(dir: string, urlPath: string) {
    return dir + '/' + urlPath;
}

