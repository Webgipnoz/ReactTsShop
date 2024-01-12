import React from "react";

import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCardContext";
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItem from "../data/items.json";

type ShoppingCardProps = {
  isOpen: boolean;
};

const ShoppingCard = ({ isOpen }: ShoppingCardProps) => {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, currCartItem) => {
                const item = storeItem.find((i) => i.id === currCartItem.id);
                return total + (item?.price || 0) * currCartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCard;
