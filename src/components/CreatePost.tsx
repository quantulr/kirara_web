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
import { getVideoThumbnail, pickFile } from "@/lib/upload.ts";
import { uploadImage } from "@/api/media.ts";

export interface CustomFile extends File {
  uid: string;
  remoteUrl?: string;
  progress?: number;
}

const CreatePost = () => {
  const [isOpen, setIsOpen] = useState(true);
  // 文件是否被拖拽进上传区域
  const [dragging, setDragging] = useState(false);
  const [activeFile, setActiveFile] = useState<number | null>(null);
  // 文件上传列表
  const [fileList, setFileList] = useState<CustomFile[]>([]);

  // 监听fileList变化，如果有新的文件被添加，就上传
  useEffect(() => {
    console.log(fileList);
    fileList.forEach((file, index) => {
      if (file.remoteUrl || file.progress) {
        return;
      }
      file.progress = 0;
      uploadImage(file, (progressEvent) => {
        setFileList((fileList) => {
          const newFileList = [...fileList];
          newFileList[index].progress = progressEvent.progress;
          return newFileList;
        });
      }).catch((error) => {
        console.log(error);
        file.progress = undefined;
      });
    });
  }, [fileList]);
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
                    pickFile({
                      accept: ["image/*"],
                      multiple: true,
                    }).then((file) => {
                      const newFileList = [...fileList, ...file];
                      setFileList(newFileList);
                      setActiveFile(newFileList.length - 1);
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
                    const newFileList = [];
                    for (const file of event.dataTransfer.files) {
                      const newFile = file as CustomFile;
                      newFile.uid = crypto.randomUUID();
                      newFileList.push(newFile);
                    }
                    setFileList([...fileList, ...newFileList]);
                  }}
                >
                  <p className={"select-none"}>点击或拖拽文件到此区域上传</p>
                </div>
              ) : (
                <div
                  className={
                    "aspect-video overflow-hidden rounded-2xl border bg-gray-800"
                  }
                >
                  {fileList[activeFile].type.startsWith("image/") ? (
                    <Image
                      className={"h-full w-full object-contain"}
                      src={URL.createObjectURL(fileList[activeFile])}
                    />
                  ) : (
                    <video
                      className={"h-full w-full"}
                      src={URL.createObjectURL(fileList[activeFile])}
                      controls
                      autoPlay
                      playsInline
                    />
                  )}
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
                        "relative aspect-square h-full overflow-hidden rounded-2xl border-2",
                        activeFile === index ? "border-blue-400" : ""
                      )}
                      onClick={() => {
                        setActiveFile(index);
                      }}
                      key={`${file.name}-${index}`}
                    >
                      {/*<div*/}
                      {/*  className={cx(*/}
                      {/*    "absolute left-0 top-0 aspect-square h-full"*/}
                      {/*  )}*/}
                      {/*  style={{*/}
                      {/*    backgroundImage:*/}
                      {/*      "radial-gradient(circle at center, rgba(255,255,255,0) 50%, blue, rgba(0,0,0,10) 50%)",*/}
                      {/*  }}*/}
                      {/*></div>*/}
                      <div
                        className={"absolute left-0 top-0 h-full w-full"}
                        style={{
                          backgroundImage: `linear-gradient(to bottom, transparent ${
                            (file.progress ?? 0) * 100
                          }%, rgba(0,0,0,0.5)  ${(file.progress ?? 0) * 100}%)`,
                        }}
                      ></div>
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
