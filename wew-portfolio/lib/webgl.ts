/**
 * True when the browser can create a WebGL context. Fails when hardware
 * acceleration is off or the GPU is blocklisted — render a static fallback then.
 */
let cached: boolean | undefined;

export function hasWebGL(): boolean {
  cached ??= probe();
  return cached;
}

/** Subscribe function for useSyncExternalStore: WebGL support never changes mid-session. */
export const subscribeWebGL = () => () => {};

function probe(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    if (!gl) return false;
    (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}
