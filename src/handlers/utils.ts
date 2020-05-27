/**
 * Format image URL with extension (replace query with dash (-))
 * For example: image-name.jpg?h=190&w=200 => image-name-h=190-w=200.jpg
 * @param url 
 * @param query: tranfrom query (h, w, ...)
 */
export function formatLocalFilePath(_url: string, query: any) {
    let _query = query;
    if (!_url && query.url) {
        let { url, ...rest } = query;
        _query = rest;
        _url = url;
    }

    // URL will remove protocal part
    let split = _url.replace(/([htfps]+:\/\/)/, '').split(".");
    let ext = split.pop();

    return `${split.join("-").replace(/\//g, '-')}${Object.keys(_query || {}).map((k: string) => k + _query[k]).join("-")}.${ext}`.toLowerCase();
}