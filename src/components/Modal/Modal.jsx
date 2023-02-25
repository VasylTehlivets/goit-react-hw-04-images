import { useEffect } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

export function Modal(props) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.code === "Escape") {
      props.closeModal();
    }
  };

  const handleClickBackDrop = (e) => {
    if (e.currentTarget === e.target) {
      props.closeModal();
    }
  };

  return (
    <div className={css.overlay} onClick={handleClickBackDrop}>
      <div className={css.modal}>
        <img src={props.largeImageURL} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};