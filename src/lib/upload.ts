export const uploadFile = (options: {
  accept: string[];
  multiple?: boolean;
}): Promise<FileList> =>
  new Promise((resolve, reject) => {
    const { accept } = options;
    const inputEl = document.createElement("input");
    inputEl.type = "file";
    inputEl.multiple = options?.multiple ?? false;
    inputEl.accept = accept.join(",");
    inputEl.click();
    inputEl.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        resolve(files);
      } else {
        reject();
      }
    };
  });

export const getVideoThumbnail = (url: string): Promise<string> => {
  console.log(url);
  return new Promise((resolve, reject) => {
    const container = document.createElement("div");
    const video = document.createElement("video");
    container.appendChild(video);
    video.src = url;
    video.autoplay = true;
    // video.muted = true;

    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      container.appendChild(canvas);
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            container.removeChild(video);
            container.removeChild(canvas);
            resolve(url);
          } else {
            reject();
          }
        });
      } else {
        reject();
      }
    });
    video.onerror = reject;
  });
};
