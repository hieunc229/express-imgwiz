import fs from "fs";

/**
 * Check and load cached file if exists
 * @param urlPath file path
 */
export function getLocalFile(dir: string, urlPath: string): Promise<{ buffer: Buffer, type: string } | null> {
    return new Promise((resolve, reject) => {
        const filePath = getFilePath(dir, urlPath);
        fs.exists(filePath, exist => {
            if (exist) {
                fs.readFile(filePath, (err, buffer) => {
                    err ? reject(err) : resolve({ buffer, type: getType(urlPath) });
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

function getType(url: string) {
    let type = (url.split(".").pop() as string).toLowerCase();

    // @ts-ignore
    return `image/${type in mimeTypes ? mimeTypes[type] : type}`
}

const mimeTypes = {
    svg: 'svg+xml',
    jpg: 'jpeg'
}