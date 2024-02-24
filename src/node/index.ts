import type { Sharp } from "sharp";

export const generate = async (
  input:
    | Buffer
    | ArrayBuffer
    | Uint8Array
    | Uint8ClampedArray
    | Int8Array
    | Uint16Array
    | Int16Array
    | Uint32Array
    | Int32Array
    | Float32Array
    | Float64Array
    | string
) => {
  if (typeof window !== "undefined") {
    throw new Error("This function is not available in the browser");
  }

  const sharp = require("sharp")(input) as Sharp;
  const blurred = await sharp.blur(100).webp().toBuffer()
  return `data:image/webp;base64,${blurred.toString("base64")}`;
};
