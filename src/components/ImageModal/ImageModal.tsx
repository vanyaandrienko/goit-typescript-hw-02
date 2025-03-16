import Modal from "react-modal";
import css from "./ImageModal.module.css";

interface Image {
  alt_description?: string;
  urls: {
    regular: string;
  };
}

interface ImageModalProps {
  isOpen: boolean;
  closeModal: () => void;
  selectedImage: Image | null;
}

export default function ImageModal({ isOpen, closeModal, selectedImage }: ImageModalProps) {
  const customStyles = {
    content: {
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: "80%",
      maxHeight: "90%",
      padding: "20px",
      borderRadius: "10px",
      border: "none",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      backgroundColor: "#fff",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
  };

  if (!selectedImage) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Modal"
      style={customStyles}
      ariaHideApp={false}
    >
      <div className={css.modal}>
        <h2 className={css.title}>{selectedImage.alt_description || "Image"}</h2>
        <img
          src={selectedImage.urls.regular}
          alt={selectedImage.alt_description || ""}
          className={css.modalImage}
        />
        <button onClick={closeModal} className={css.modalBtn}>
          Close
        </button>
      </div>
    </Modal>
  );
}