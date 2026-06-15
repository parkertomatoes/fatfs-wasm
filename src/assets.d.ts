declare module '*.wasm?url' {
    const url: string;
    export default url;
}

declare module '*.wasm?url&no-inline' {
    const url: string;
    export default url;
}
