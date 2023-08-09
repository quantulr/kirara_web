import request from "@/lib/request.ts";
import { CustomFile } from "@/components/CreatePost.tsx";
import { AxiosProgressEvent } from "axios";

export const pickFile = (options: {
  accept: string[];
  multiple?: boolean;
}): Promise<CustomFile[]> =>
  new Promise((resolve, reject) => {
    const { accept } = options;
    const inputEl = document.createElement("input");
    inputEl.type = "file";
    inputEl.multiple = options?.multiple ?? false;
    inputEl.accept = accept.join(",");
    inputEl.click();
    inputEl.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      const fileList = [];
      if (files) {
        for (const file of files) {
          const customFile = file as CustomFile;
          customFile.uid = crypto.randomUUID();
          // const fileReader = new FileReader();
          // fileReader.onload = (e) => {
          //   const result = e.target?.result;
          //   console.log(result);
          //   console.log(isSecureContext);
          //   console.log(crypto.subtle);
          // };
          // fileReader.readAsArrayBuffer(file);
          fileList.push(customFile);
        }
        resolve(fileList);
      } else {
        reject();
      }
    };
  });

export const uploadFile = (file: CustomFile): Promise<string> => {
  const formData = new FormData();
  formData.set("file", file);
  return request.post("/api/v/upload", {
    contentType: "multipart/form-data",
    onUploadProgress: (e: AxiosProgressEvent) => {
      console.log(e);
    },
  });
};

export const getVideoThumbnail = (url: string): Promise<string> => {
  console.log(url);
  return new Promise((resolve, reject) => {
    const container = document.createElement("div");
    const video = document.createElement("video");
    container.appendChild(video);
    video.src = url;
    video.autoplay = true;
    video.muted = true;

    video.addEventListener("canplay", () => {
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
