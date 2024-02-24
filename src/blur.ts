import * as StackBlur from "stackblur-canvas";

export const generateImagePlaceholder = (image: File, radius = 180) =>
  new Promise<string>((resolve, reject) => {
    const $canvas = document.createElement("canvas");
    const $img = new Image();
    hideElement($canvas);
    hideElement($img);

    $img.src = URL.createObjectURL(image);

    const cleanup = () => {
      document.body.removeChild($canvas);
      document.body.removeChild($img);
      URL.revokeObjectURL($img.src);
    };

    $img.onload = () => {
      StackBlur.image($img, $canvas, radius, false);
      resolve($canvas.toDataURL("image/jpeg"));
      cleanup();
    };

    $img.onerror = (e) => {
      cleanup();
      reject(e);
    };

    document.body.appendChild($canvas);
    document.body.appendChild($img);
  });

const hideElement = (el: HTMLElement) => {
  el.style.opacity = "0";
  el.style.position = "fixed";
  el.style.top = "0";
  el.style.left = "0";
  el.style.pointerEvents = "none";
  el.style.zIndex = "-100";
};
