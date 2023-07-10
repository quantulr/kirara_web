import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={""}>
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
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Home;
