import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface Picture {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
}

interface ImageGalleryProps {
  pictures: Picture[];
  onClick: (picture: Picture) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ pictures, onClick }) => {
  return (
    <ul className={css.list}>
      {pictures.map((picture) => {
        return (
          <li key={picture.id} className={css.imgBox}>
            <ImageCard picture={picture} onClick={onClick} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;