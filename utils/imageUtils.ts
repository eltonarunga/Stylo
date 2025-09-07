/**
 * Resizes and crops an image file to a specified aspect ratio and maximum size.
 * @param file The image file to resize.
 * @param maxSize The maximum width or height of the resized image.
 * @param aspectRatio The target aspect ratio as a string (e.g., '1:1', '4:5').
 * @returns A promise that resolves to a data URL (base64) of the resized and cropped image.
 */
export const resizeImage = (file: File, maxSize: number, aspectRatio: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      if (!event.target?.result) {
        return reject(new Error("Could not read file."));
      }
      const img = new Image();
      img.src = event.target.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return reject(new Error('Could not get canvas context'));
        }

        const [aspectW, aspectH] = aspectRatio.split(':').map(Number);
        const targetRatio = aspectW / aspectH;
        const originalRatio = img.width / img.height;

        let sx = 0, sy = 0, sWidth = img.width, sHeight = img.height;

        // Calculate source crop dimensions (center crop)
        if (originalRatio > targetRatio) {
          // Image is wider than target, crop width
          sWidth = img.height * targetRatio;
          sx = (img.width - sWidth) / 2;
        } else if (originalRatio < targetRatio) {
          // Image is taller than target, crop height
          sHeight = img.width / targetRatio;
          sy = (img.height - sHeight) / 2;
        }

        // Calculate destination dimensions based on maxSize
        let dWidth = sWidth;
        let dHeight = sHeight;

        if (dWidth > dHeight) {
          if (dWidth > maxSize) {
            dHeight = Math.round(dHeight * (maxSize / dWidth));
            dWidth = maxSize;
          }
        } else {
          if (dHeight > maxSize) {
            dWidth = Math.round(dWidth * (maxSize / dHeight));
            dHeight = maxSize;
          }
        }
        
        canvas.width = dWidth;
        canvas.height = dHeight;
        
        // Draw the cropped and resized image
        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, dWidth, dHeight);

        resolve(canvas.toDataURL(file.type, 0.9));
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};


/**
 * Converts a data URL string to a File object.
 * @param dataurl The data URL string.
 * @param filename The desired filename for the new File object.
 * @returns A File object.
 */
export const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    throw new Error('Invalid data URL');
  }
  const mime = mimeMatch[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
