import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../ImageCard/ImageCard";


interface ImageGalleryProps {
  pictures: Image[];
  onClick: (picture: Image) => void;
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