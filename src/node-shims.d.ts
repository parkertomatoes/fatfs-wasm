declare const __dirname: string;
declare class Buffer extends Uint8Array {}

declare module 'node:fs/promises' {
    export function readFile(path: string): Promise<Uint8Array>;
}

declare module 'fs/promises' {
    export function readFile(path: string): Promise<Buffer>;
}

declare module 'path' {
    const path: {
        join(...paths: string[]): string;
    };
    export default path;
}

declare module 'node:url' {
    export function fileURLToPath(url: string | URL): string;
    export function pathToFileURL(path: string): URL;
}

declare module 'node:process' {
    export function cwd(): string;
}
