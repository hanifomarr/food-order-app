import React from "react";
import classes from "./CartItem.module.css";

function CartItem({ key, name, price, amount, onAddItem, onRemoveItem }) {
  return (
    <li key={key} className={classes["cart-item"]}>
      <div>
        <h2>{name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>{amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onAddItem}>+</button>
        <button onClick={onRemoveItem}>-</button>
      </div>
    </li>
  );
}

export default CartItem;
