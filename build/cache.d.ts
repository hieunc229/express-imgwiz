/// <reference types="node" />
/**
 * Check and load cached file if exists
 * @param dir: local directory path
 * @param urlPath: file path
 */
export declare function getLocalFile(dir: string, urlPath: string): Promise<{
    buffer: Buffer;
    ext: string;
    mime: string;
} | null>;
/**
 * Write file to disk
 * @param urlPath file path
 */
export declare function saveLocalFile(dir: string, urlPath: string, data: Buffer): Promise<any>;
