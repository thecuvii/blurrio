import Compressor from "compressorjs";

export const compressImage = (
  image: File,
  {
    quality = 0.8,
    maxWidth = 3840,
    maxHeight = 3840,
    convertSize,
  }: {
    quality?: number;
    maxWidth?: number;
    maxHeight?: number;
    convertSize?: number;
  }
) =>
  new Promise<File>((resolve, reject) => {
    new Compressor(image, {
      quality,
      maxWidth,
      maxHeight,
      convertSize,
      success: (res) => {
        if (res instanceof Blob) {
          resolve(new File([res], image.name));
        } else {
          resolve(res);
        }
      },
      error: reject,
    });
  });
