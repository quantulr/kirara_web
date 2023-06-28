import { CircularProgress, IconButton, useToast } from "@chakra-ui/react";
import { BiUpload } from "react-icons/bi";
import { Icon } from "@chakra-ui/icons";
import { uploadImage } from "@/api/media.ts";
import { useState } from "react";

const FloatingUploadButton = ({ className }: { className?: string }) => {
  const toast = useToast();
  // 上传进度 -1 代表未上传 0-100 代表上传进度 100 代表上传完成 -2 代表上传失败 -3 代表上传取消  -4 代表上传暂停 -5 代表上传中断 -6 代表网络错误 -7 代表文件验证失败 -8 代表文件太大 -9 代表文件类型不对 -10 代表文件数量超出限制
  const [progress, setProgress] = useState(-1);
  return (
    <>
      {/* 上传图片*/}
      {progress === -1 ? (
        <IconButton
          className={`!h-12 !w-12 ${className}`}
          aria-label="上传图片"
          icon={<Icon as={BiUpload} />}
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.click();
            input.onchange = () => {
              const file = input.files?.item(0);
              if (file) {
                uploadImage(file, (event) => {
                  const { loaded, total } = event;
                  total && setProgress((loaded / total) * 100);
                }).then(() => {
                  setTimeout(() => {
                    setProgress(-1);
                  }, 120);
                  toast({
                    title: "上传成功",
                    status: "success",
                    position: "top"
                  });
                });
              }
            };
          }}
        />
      )/* : progress === 100 ? (
        <div className={`h-12 w-12 ${className}`}>
          <Icon boxSize={"100%"} color={"springgreen"} as={CheckCircleIcon} />
        </div>
      )*/ : (
        <div className={`h-12 w-12 ${className}`}>
          <CircularProgress size={"100%"} value={progress} />
        </div>
      )}
    </>
  );
};

export default FloatingUploadButton;
