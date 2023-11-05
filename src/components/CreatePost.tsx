import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { memo, useEffect, useMemo, useState } from "react";
import { ClassNames } from "@emotion/react";
import { AddIcon } from "@chakra-ui/icons";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { getVideoThumbnail, pickFile } from "@/lib/upload.ts";
import { uploadMedia } from "@/api/media.ts";
import { publicPost } from "@/api/post.ts";

export interface CustomFile extends File {
  uid: string;
  remoteUrl?: string;
  progress?: number;
  remoteId?: number;
}

enum createPostStep {
  "uploading",
  "editing",
}

const CreatePost = ({
  open,
  close,
  onSuccess,
}: {
  open: boolean;
  close: () => void;
  onSuccess: () => void;
}) => {
  const toast = useToast();
  // 文件是否被拖拽进上传区域
  const [dragging, setDragging] = useState(false);
  const [activeFile, setActiveFile] = useState<number | null>(null);
  // 文件上传列表
  const [fileList, setFileList] = useState<CustomFile[]>([]);
  const [description, setDescription] = useState<string>();
  // 步骤
  const [step, setStep] = useState(createPostStep.uploading);
  // 监听fileList变化，如果有新的文件被添加，就上传
  useEffect(() => {
    fileList.forEach((file, index) => {
      if (file.remoteUrl || file.progress !== undefined) {
        return;
      }
      file.progress = 0;
      uploadMedia(file, (progressEvent) => {
        setFileList((fileList) => {
          const newFileList = [...fileList];
          newFileList[index].progress = progressEvent.progress;
          return newFileList;
        });
      })
        .then((resp) => {
          const newFileList = [...fileList];
          newFileList[index].remoteUrl = resp.path;
          newFileList[index].remoteId = resp.id;
        })
        .catch((_error) => {
          file.progress = undefined;
        });
    });
  }, [fileList]);

  // 监听弹窗开启关闭事件
  useEffect(() => {
    if (open) {
      setFileList(() => []);
      setStep(() => createPostStep.uploading);
      setDescription(() => undefined);
    }
  }, [open]);

  const isAllUploaded = useMemo(
    () => fileList.every((file) => file.progress === 1) && !!fileList.length,
    [fileList],
  );
  return (
    <ClassNames>
      {({ css, cx }) => (
        <Modal
          size={{
            base: "full",
            md: "2xl",
          }}
          isOpen={open}
          onClose={() => {
            close();
            setFileList([]);
            setActiveFile(null);
            setStep(createPostStep.uploading);
          }}
        >
          <ModalOverlay></ModalOverlay>

          <ModalContent>
            <ModalHeader>创建新帖子</ModalHeader>
            <ModalCloseButton />
            {step === createPostStep.uploading ? (
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
                      `,
                    )}
                  >
                    {fileList.map((file, index) => (
                      <li
                        className={cx(
                          "relative aspect-square h-full overflow-hidden rounded-2xl border-2",
                          activeFile === index ? "border-blue-400" : "",
                        )}
                        onClick={() => {
                          setActiveFile(index);
                        }}
                        key={`${file.name}-${index}`}
                      >
                        <div
                          className={"absolute left-0 top-0 h-full w-full"}
                          style={{
                            backgroundImage: `linear-gradient(to bottom, transparent ${
                              (file.progress ?? 0) * 100
                            }%, rgba(0,0,0,0.5)  ${
                              (file.progress ?? 0) * 100
                            }%)`,
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
            ) : step === createPostStep.editing ? (
              <ModalBody>
                <Textarea
                  placeholder={"输入内容"}
                  value={description}
                  onInput={(event) => {
                    setDescription(
                      () => (event.target as HTMLTextAreaElement).value,
                    );
                  }}
                />
              </ModalBody>
            ) : null}
            <ModalFooter>
              {step === createPostStep.uploading ? (
                <>
                  {fileList.length > 0 && (
                    <Button
                      onClick={() => {
                        setStep(() => createPostStep.editing);
                      }}
                      isLoading={!isAllUploaded}
                      loadingText={"正在上传"}
                    >
                      下一步
                    </Button>
                  )}
                </>
              ) : step === createPostStep.editing ? (
                <>
                  <Button
                    className={"mr-4"}
                    onClick={() => {
                      setStep(() => createPostStep.uploading);
                    }}
                  >
                    上一步
                  </Button>
                  <Button
                    onClick={() => {
                      publicPost({
                        description,
                        mediaIds: fileList
                          .filter((el) => el.remoteId !== undefined)
                          .map((file) => file.remoteId!),
                      }).then(() => {
                        toast({
                          title: "发布成功",
                          status: "success",
                        });
                        onSuccess();
                        close();
                      });
                    }}
                  >
                    发布
                  </Button>
                </>
              ) : null}
            </ModalFooter>
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
      setThumbSrc(resp);
    });
  }, [file]);
  return <Image src={thumbSrc} className={"h-full w-full object-cover"} />;
});

export default CreatePost;
