import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Modal from "react-modal";
import toast from "react-hot-toast";

type Image = {
  id: string;
  alt_description?: string;
  urls: {
    small: string;
    regular: string;
  };
};

function App() {
  const [pictures, setPictures] = useState<Image[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  function openModal(image: Image) {
    setSelectedImage(image);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedImage(null);
  }

  function loadMore() {
    setPage((prev) => prev + 1);
  }

  useEffect(() => {
    async function fetchPictures(topic: string, page: number) {
      try {
        setError(false);
        setLoading(true);
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              page,
              per_page: 15,
              query: topic,
              client_id: "NCcq5dFv_hu6BanaDTQCip7pprCn2rAOKxu2idOWEFI",
            },
          }
        );

        setPictures((prevPictures) =>
          page === 1 ? response.data.results : [...prevPictures, ...response.data.results]
        );

        setTotalPages(response.data.total_pages);

        if (response.data.results.length === 0) {
          toast.error("No results. Try again!", {
            duration: 3000,
            position: "top-right",
          });
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (topic) {
      fetchPictures(topic, page);
    }
  }, [topic, page]);

  return (
    <div className="app">
      <SearchBar
        onSubmit={(newTopic: string) => {
          setTopic(newTopic);
          setPage(1);
          setPictures([]);
        }}
      />
      {error && <ErrorMessage />}
      {loading && (
        <div className="loader">
          <Loader />
        </div>
      )}
      <ImageGallery pictures={pictures} onClick={openModal} />
      {pictures.length > 0 && !loading && !error && page < totalPages && (
        <LoadMoreBtn onClick={loadMore} />
      )}
      {modalIsOpen && (
        <ImageModal isOpen={modalIsOpen} closeModal={closeModal} selectedImage={selectedImage} />
      )}
    </div>
  );
}

export default App;
