/**
 * Format image URL with extension (replace query with dash (-))
 * For example: image-name.jpg?h=190&w=200 => image-name-h=190-w=200.jpg
 * @param url 
 * @param query: tranfrom query (h, w, ...)
 */
export function formatLocalFilePath(url: string, query: any, flattenDirectory?: boolean) {


    // URL will remove protocal part
    let split = url.toLowerCase().replace(/([htfps]+:\/\/)/, '').split(".");
    let ext = split.pop();

    if (ext === 'svg') {
        query = {};
    }

    let output = `${split.join("-")}${Object.keys(query || {}).map((k: string) => k + query[k]).join("-")}${ext ? '.' + ext : ''}`;
    return flattenDirectory ? output.replace(/\//g, '-') : output;
}