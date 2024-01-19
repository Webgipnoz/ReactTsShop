import { Link } from "react-router-dom";
import { Button, Offcanvas, Stack } from "react-bootstrap";
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItem from "../data/items.json";
import { useSelector, useDispatch } from "react-redux";
import { selectItem, toggleCartVisibility } from "../redux/slices/itemsSlice";

const ShoppingCard = () => {
  const { cartItems, showCart } = useSelector(selectItem);
  const dispatch = useDispatch();

  const closeCart = () => {
    dispatch(toggleCartVisibility());
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, currCartItem) => {
      const item = storeItem.find((i) => i.id === currCartItem.id);
      return acc + (item?.price || 0) * currCartItem.quantity;
    }, 0);

    return formatCurrency(Number(total));
  };

  return (
    <Offcanvas
      style={{ width: "40%" }}
      show={showCart}
      onHide={closeCart}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">Total {calculateTotal()}</div>
        </Stack>
        <Link to={"/order"}>
          <Button onClick={closeCart} variant="success" size="lg">
            Submit
          </Button>
        </Link>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCard;
