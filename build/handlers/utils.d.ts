/**
 * Format image URL with extension (replace query with dash (-))
 * For example: image-name.jpg?h=190&w=200 => image-name-h=190-w=200.jpg
 * @param url
 * @param query: tranfrom query (h, w, ...)
 */
export declare function formatLocalFilePath(url: string, query: any): string;
