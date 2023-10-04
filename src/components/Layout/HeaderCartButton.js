import React, { useContext, useEffect, useState } from "react";
import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/CartContext";

function HeaderCartButton({ onClick }) {
  const [btnIsFocus, setBtnIsFocus] = useState(false);
  const { item } = useContext(CartContext);

  const numberOfCartItems = item.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${btnIsFocus ? classes.bump : ""}`;

  useEffect(() => {
    if (item.length === 0) {
      return;
    }
    setBtnIsFocus(true);

    const timer = setTimeout(() => {
      setBtnIsFocus(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [item]);

  return (
    <button onClick={onClick} className={buttonClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCartButton;
