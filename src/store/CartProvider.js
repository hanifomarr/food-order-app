import React, { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      let updatedItems;
      if (state.items.find((item) => item.id === action.item.id)) {
        updatedItems = state.items.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + action.item.amount }
            : item
        );
      } else {
        updatedItems = [...state.items, action.item];
      }
      return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      };
    case "REMOVE":
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingItem.price;

      let updatedRemoveItems;
      if (existingItem.amount === 1) {
        updatedRemoveItems = state.items.filter(
          (item) => item.id !== action.id
        );
      } else {
        const updatedItem = {
          ...existingItem,
          amount: existingItem.amount - 1,
        };
        updatedRemoveItems = [...state.items];
        updatedRemoveItems[existingCartItemIndex] = updatedItem;
      }
      return {
        items: updatedRemoveItems,
        totalAmount: updatedTotalAmount,
      };

    default:
      return defaultCartState;
  }
};

function CartProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    item: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
