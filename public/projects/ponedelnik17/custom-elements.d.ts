declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': any;
      [elemName: string]: any;
    }
  }
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

export {};
