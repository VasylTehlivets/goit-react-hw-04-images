import { useState, useEffect } from "react";
import { animateScroll } from "react-scroll";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar";
import { fetchImages } from "../Servises/Api";
import css from "./App.module.css";

export function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [onLoadMore, setOnLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");

  useEffect(() => {
    if (!query) return;
    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...hits]);
        setOnLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, [query, page]);

  const onFormSubmit = (query) => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setOnLoadMore(false);
  };

  const openModal = (largeImageURL) => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: "linear",
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onFormSubmit} />
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {onLoadMore && <Button onLoadMore={handleLoadMore} page={page} />}
      {showModal && (
        <Modal largeImageURL={largeImageURL} closeModal={closeModal} />
      )}
    </div>
  );
}