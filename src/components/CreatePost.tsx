import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";

const CreatePost = () => {
  const [isOpen, setIsOpen] = useState(true);
  // 文件是否被拖拽进上传区域
  const [dragging, setDragging] = useState(false);
  return (
    <>
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
            <div
              className={`flex h-96 items-center justify-center rounded-xl border ${
                dragging
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300 bg-white"
              }`}
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
                // event.stopPropagation();
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
                console.log(event.dataTransfer.files);
              }}
            >
              {/*<IconButton*/}
              {/*  className={`${dragging ? "!hidden" : "!block"}`}*/}
              {/*  aria-label={"上传图片"}*/}
              {/*  icon={<Icon as={FaUpload} />}*/}
              {/*/>*/}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              关闭
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePost;
