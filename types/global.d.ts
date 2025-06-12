declare namespace Express {
    export interface Multer {
        File: {
            fieldname: string;
            originalname: string;
            encoding: string;
            mimetype: string;
            size: number;
            buffer: Buffer;
        };
    }
}

declare module '@ffmpeg/ffmpeg' {
    export function fetchFile(path: string): Promise<Uint8Array>;
    export function createFFmpeg(options?: any): any;
}