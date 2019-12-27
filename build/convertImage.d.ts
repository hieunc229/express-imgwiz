/// <reference types="node" />
declare type ImageOptions = {
    h?: string;
    w?: string;
    crop?: string;
    fm?: string;
    fit?: "cover" | "contain" | "fill" | "inside" | "outside";
    position?: "top" | "right top" | "right" | "right bottom" | "bottom" | "bottom left" | "left top";
    kernel?: "nearest" | "cubic" | "mitchell" | "lanczos2" | "lanczos3";
    enlarge?: string;
    sharpen?: string;
    q?: string;
    blur?: string;
};
export declare function convertImage(url: string, opts: ImageOptions): Promise<{
    buffer: Buffer;
    type: string;
}>;
export {};
