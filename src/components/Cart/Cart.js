import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/CartContext";
import Checkout from "./Checkout";

function Cart({ onClick }) {
  const [isCheckout, setIsCheckout] = useState(false);
  const CartCtx = useContext(CartContext);

  const totalAmount = CartCtx.totalAmount.toFixed(2);
  const hasItems = CartCtx.item.length > 0;

  const addItemHandler = (item) => {
    CartCtx.addItem({ ...item, amount: 1 });
  };
  const removeItemHandler = (id) => {
    CartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    const res = await fetch(
      "https://react-http-1808d-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          userData: userData,
          orderItems: CartCtx.item,
        }),
      }
    );

    const body = await res.json();
    console.log("🚀 ~ file: Cart.js:39 ~ submitOrderHandler ~ body:", body);
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

  const orderButton = (
    <div className={classes.actions}>
      <button onClick={onClick} className={classes["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onClick={onClick} onSubmitUserData={submitOrderHandler} />
      )}
      {!isCheckout && orderButton}
    </Modal>
  );
}

export default Cart;
