import React from "react";
import css from "./ImageCard.module.css";

interface Picture {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
}

interface ImageCardProps {
  picture: Picture;
  onClick: (picture: Picture) => void;
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