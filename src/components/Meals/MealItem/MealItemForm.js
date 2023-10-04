import React, { useRef } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

function MealItemForm({ id, onAddToCart }) {
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredInput = +amountInputRef.current.value;

    if (enteredInput < 0 || enteredInput > 5) {
      return;
    }

    onAddToCart(enteredInput);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: id,
          type: "number",
          min: 1,
          max: 5,
          defaultValue: 1,
          step: 1,
        }}
      />
      <button>+Add</button>
    </form>
  );
}

export default MealItemForm;
