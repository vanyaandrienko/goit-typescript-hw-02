import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={css.loadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;