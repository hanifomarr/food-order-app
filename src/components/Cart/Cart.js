import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/CartContext";

function Cart({ onClick }) {
  const CartCtx = useContext(CartContext);

  const totalAmount = CartCtx.totalAmount.toFixed(2);
  const hasItems = CartCtx.item.length > 0;

  const addItemHandler = (item) => {
    CartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItemHandler = (id) => {
    CartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {CartCtx.item.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAddItem={addItemHandler.bind(null, item)}
          onRemoveItem={removeItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={onClick} className={classes["button--alt"]}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
