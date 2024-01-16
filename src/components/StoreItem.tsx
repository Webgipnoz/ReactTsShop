import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";

import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCardContext";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
  const { setItemQuantity } = useShoppingCart();
  const [quantity, setQuantity] = useState(0);
  const [submitPressed, setSubmitPressed] = useState(false);

  function incrementItem() {
    setQuantity(quantity + 1);
  }

  function decrementItem() {
    setQuantity(quantity - 1);
  }

  function buttonIsPressed() {
    setItemQuantity({ id, quantity });
    setSubmitPressed(true);
  }

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="fs-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {submitPressed === false ? (
            <Button className="w-100" onClick={() => buttonIsPressed()}>
              + Add To Card
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5 rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5 rem" }}
              >
                <Button onClick={() => decrementItem()}> - </Button>
                <div>
                  <span className="fs-3">{quantity}</span>
                </div>
                <Button onClick={() => incrementItem()}> + </Button>
              </div>
              <Button
                variant="success"
                size="sm"
                onClick={() => setItemQuantity({ id, quantity })}
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
