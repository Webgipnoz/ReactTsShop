import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  increment,
  decrement,
  removeItemFromCart,
} from "../redux/slices/itemsSlice";

import storeItems from "../data/items.json";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemsProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemsProps) => {
  const dispatch = useDispatch();

  const incrementItem = (itemId: number) => {
    dispatch(increment(itemId));
  };

  const decrementItem = (itemId: number) => {
    if (quantity > 0) {
      dispatch(decrement(itemId));
    }
  };

  const removeFromCart = (itemId: number) => {
    dispatch(removeItemFromCart(itemId));
  };

  return (
    <Stack direction="horizontal" gap={4} className="d-flex align-items-center">
      <img
        src={storeItems[id - 1].imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>{storeItems[id - 1].name} </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(storeItems[id - 1].price)}
        </div>
      </div>
      <div> {formatCurrency(storeItems[id - 1].price * quantity)}</div>
      <Button
        onClick={() => {
          decrementItem(id);
        }}
      >
        -
      </Button>
      <span className="text-muted" style={{ fontSize: ".65rem" }}>
        x{quantity}
      </span>
      <Button
        onClick={() => {
          incrementItem(id);
        }}
      >
        +
      </Button>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
