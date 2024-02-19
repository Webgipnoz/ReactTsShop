import { Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { removeAllItemsFromCart, selectItem } from "../redux/slices/itemsSlice";
import { useDispatch } from "react-redux";

import orderItem from "../data/items.json";
import OrderItem from "../components/OrderItem";

const OrderPage = () => {
  const { cartItems } = useSelector(selectItem);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = orderItem[item.id - 1].price;
    return total + itemPrice * item.quantity;
  }, 0);

  const submitOrder = () => {
    dispatch(removeAllItemsFromCart());
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <h1>Order</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {cartItems.map((item) => (
          <Col key={item.id}>
            <OrderItem
              id={item.id}
              name={orderItem[item.id - 1].name}
              price={orderItem[item.id - 1].price}
              imgUrl={orderItem[item.id - 1].imgUrl}
              quantity={item.quantity}
            />
          </Col>
        ))}
      </Row>
      <div
        style={{
          bottom: 0,
          right: 0,
          marginRight: "200px",
          marginBottom: "20px",
        }}
      >
        <p>Total Price : {totalPrice}</p>
        <Button onClick={() => submitOrder()}>Pay</Button>
      </div>
    </div>
  );
};

export default OrderPage;
