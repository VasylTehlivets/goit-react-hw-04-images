import React from "react";
import PropTypes from "prop-types";
import css from "./Button.module.css";

export const Button = ({ onLoadMore }) => {
  const handleClick = () => {
    onLoadMore();
  };

  return (
    <div className={css.buttonContainer}>
      <button type="button" className={css.button} onClick={handleClick}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func,
};