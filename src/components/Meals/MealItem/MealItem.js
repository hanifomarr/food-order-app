import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/CartContext";

function MealItem({ name, desc, price, id }) {
  const CartCtx = useContext(CartContext);

  const addtoCartHandler = (amount) => {
    CartCtx.addItem({
      id: id,
      name: name,
      price: price,
      amount: amount,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{desc}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={addtoCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
