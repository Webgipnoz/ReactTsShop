import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectItem } from "../redux/slices/itemsSlice";
import StoreItem from "../components/StoreItem";
import orderItem from "../data/items.json";

const OrderPage = () => {
  const { cartItems } = useSelector(selectItem);

  return (
    <>
      <h1>Order123</h1>
      <>123</>
      {/* <Row md={2} xs={1} lg={3} className="g-3">
        {cartItems.map((item) => (
          <Col key={item.id}>
            <StoreItem
              id={item.id}
              name={orderItem[item.id].name}
              price={orderItem[item.id].price}
              imgUrl={orderItem[item.id].imgUrl}
            />
          </Col>
        ))}
      </Row> */}
    </>
  );
};

export default OrderPage;
