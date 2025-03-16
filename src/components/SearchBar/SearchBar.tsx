import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (topic: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const topic = (form.elements.namedItem("topic") as HTMLInputElement)?.value.trim();
    
    if (!topic) {
      toast.error("Enter parameters for search!", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }
    onSubmit(topic);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          name="topic"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.input}
        />
        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </form>
      <Toaster />
    </header>
  );
}