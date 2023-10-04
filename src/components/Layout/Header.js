import React from "react";
import classes from "./Header.module.css";

import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

function Header({ onClick }) {
  return (
    <>
      <header className={classes.header}>
        <h1>Meals</h1>
        <HeaderCartButton onClick={onClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="table food" />
      </div>
    </>
  );
}

export default Header;
