import { IconButton, useToast } from "@chakra-ui/react";
import { BiUpload } from "react-icons/bi";
import { Icon } from "@chakra-ui/icons";
import { uploadImage } from "@/api/media.ts";

const FloatingUploadButton = ({ className }: { className?: string }) => {
  const toast = useToast();
  return (
    <>
      {/* 上传图片*/}
      <IconButton
        className={className}
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
              uploadImage(file).then((res) => {
                console.log(res);
                toast({
                  title: "上传成功",
                  status: "success",
                  position: "top",
                });
              });
            }
          };
        }}
      />
    </>
  );
};

export default FloatingUploadButton;
