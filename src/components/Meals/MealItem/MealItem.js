import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

function MealItem({ name, desc, price, id }) {
  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{desc}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={id} />
      </div>
    </li>
  );
}

export default MealItem;
