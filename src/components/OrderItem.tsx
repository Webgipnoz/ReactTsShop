import React from "react";
import { Card } from "react-bootstrap";

type OrderItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  quantity: number;
};

const OrderItem = ({ name, price, imgUrl, quantity }: OrderItemProps) => {
  return (
    <Card className="mb-3" style={{ width: "100%" }}>
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
      </Card.Body>
      <Card.Footer className="text-muted">
        <div className="d-flex justify-content-between align-items-center">
          <span className="font-weight-bold">Price of 1 Item:</span> {price}
        </div>
        {quantity > 1 ? (
          <div className="d-flex justify-content-between align-items-center">
            <span className="font-weight-bold">Price of {quantity} Items:</span>
            {price * quantity}
          </div>
        ) : null}
      </Card.Footer>
    </Card>
  );
};

export default OrderItem;
