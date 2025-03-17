import React from "react";
import css from "./ImageCard.module.css";

export interface Image {
  id: string;
  alt_description?: string;
  urls: {
    small: string;
    regular: string;
  };
}

interface ImageCardProps {
  picture: Image;
  onClick: (picture: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ picture, onClick }) => {
  return (
    <div>
      <img
        src={picture.urls.small}
        alt={picture.alt_description || "No description"}
        onClick={() => onClick(picture)}
        className={css.image}
      />
    </div>
  );
};

export default ImageCard;