import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { ClassNames } from "@emotion/react";
import { AddIcon } from "@chakra-ui/icons";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { getVideoThumbnail, uploadFile } from "@/lib/upload.ts";

const CreatePost = () => {
  const [isOpen, setIsOpen] = useState(true);
  // 文件是否被拖拽进上传区域
  const [dragging, setDragging] = useState(false);
  const [activeFile, setActiveFile] = useState<number | null>(null);
  // 文件上传列表
  const [fileList, setFileList] = useState<File[]>([]);
  return (
    <ClassNames>
      {({ css, cx }) => (
        <Modal
          size={{
            base: "full",
            md: "2xl",
          }}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <ModalOverlay></ModalOverlay>

          <ModalContent>
            <ModalHeader>创建新帖子</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {activeFile === null ? (
                <div
                  className={`flex aspect-video cursor-pointer items-center justify-center rounded-xl border ${
                    dragging
                      ? "border-blue-500 bg-blue-100"
                      : "border-gray-300 bg-white"
                  }`}
                  onClick={() => {
                    uploadFile({
                      accept: ["image/*", "video/*"],
                      multiple: true,
                    }).then((file) => {
                      setFileList([...fileList, ...file]);
                    });
                  }}
                  onDragEnter={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setDragging(false);
                  }}
                  onDragOver={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                  }}
                  onDragEnd={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setDragging(false);
                  }}
                  onDrop={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    setDragging(false);
                    setFileList([...fileList, ...event.dataTransfer.files]);
                  }}
                >
                  <p className={"select-none"}>点击或拖拽文件到此区域上传</p>
                </div>
              ) : (
                <div
                  className={
                    "aspect-video overflow-hidden rounded-2xl border bg-gray-500"
                  }
                >
                  <video
                    className={"h-full w-full"}
                    src={URL.createObjectURL(fileList[activeFile])}
                    controls
                    autoPlay
                    playsInline
                  />
                </div>
              )}

              <OverlayScrollbarsComponent className={"mt-6 h-28 px-1"}>
                <ul
                  className={cx(
                    "flex h-full justify-start",
                    css`
                      li {
                        flex-shrink: 0;
                      }

                      // 除去第一个li，其他的li都有左边距
                      & > li:not(:last-of-type) {
                        margin-right: 12px;
                      }
                    `
                  )}
                >
                  {fileList.map((file, index) => (
                    <li
                      className={cx(
                        "aspect-square h-full overflow-hidden rounded-2xl border-2",
                        activeFile === index ? "border-blue-400" : ""
                      )}
                      onClick={() => {
                        setActiveFile(index);
                      }}
                      key={`${file.name}-${index}`}
                    >
                      {
                        //   如果是图片，就显示图片
                        file.type.startsWith("image/") ? (
                          <Image
                            className={"h-full w-full object-cover"}
                            src={URL.createObjectURL(file)}
                            alt={""}
                          />
                        ) : file.type.startsWith("video/") ? (
                          <VideoThumb file={file} />
                        ) : null
                      }
                    </li>
                  ))}
                  {fileList.length > 0 && activeFile !== null && (
                    <li>
                      <div
                        onClick={() => {
                          // 上传文件，图片和视频
                          setActiveFile(() => null);
                        }}
                        className={
                          "flex aspect-square h-full cursor-pointer items-center justify-center rounded-2xl border"
                        }
                      >
                        <AddIcon className={"text-2xl !text-gray-500"} />
                      </div>
                    </li>
                  )}
                </ul>
              </OverlayScrollbarsComponent>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </ClassNames>
  );
};

const VideoThumb = memo(({ file }: { file: File }) => {
  const [thumbSrc, setThumbSrc] = useState("");

  useEffect(() => {
    getVideoThumbnail(URL.createObjectURL(file)).then((resp) => {
      console.log(resp);
      setThumbSrc(resp);
    });
  }, [file]);
  return <Image src={thumbSrc} className={"h-full w-full object-cover"} />;
});

export default CreatePost;
