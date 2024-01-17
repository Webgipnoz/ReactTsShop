import { ReactNode, useState } from "react";
import { useContext, createContext } from "react";

import ShoppingCard from "../components/ShoppingCard";

type ShoppingCardProviderProps = {
  children: ReactNode;
};

type ShoppingCardContext = {
  setItemQuantity: (data: { id: number; quantity: number }) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: Item[];
  showCart: () => void;
};

type Item = {
  id: number;
  quantity: number;
};

const ShoppingCardContext = createContext({} as ShoppingCardContext);

export function useShoppingCart() {
  return useContext(ShoppingCardContext);
}

export default function ShoppingCardProvider({
  children,
}: ShoppingCardProviderProps) {
  const [cartItems, setCartItems] = useState<Item[]>([]); // список всех айтемов в корзине
  const [isOpen, setIsOpen] = useState(false); // показывать корзину или нет

  const cartQuantity = cartItems.reduce(
    //общее quantity вссех предметов в карзине
    (quantity, item) => quantity + item.quantity,
    0
  );

  function showCart() {
    // показывать ли корзину или нет
    setIsOpen(!isOpen);
  }

  function setItemQuantity(data: { id: number; quantity: number }) {
    // запись количества предмета в корзину
    const { id, quantity } = data;
    setCartItems((items) => {
      const updatedItems = [...items];
      const index = updatedItems.findIndex((item) => item.id === id);

      if (index !== -1) {
        updatedItems[index] = {
          id,
          quantity: updatedItems[index].quantity + quantity,
        };
      } else {
        updatedItems.push({ id, quantity });
      }

      return updatedItems;
    });
  }

  function removeFromCart(id: number) {
    // удаляем айтем и его quantity
    setCartItems((currItem) => {
      return currItem.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCardContext.Provider
      value={{
        setItemQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        showCart,
      }}
    >
      {children}
      <ShoppingCard isOpen={isOpen} />
    </ShoppingCardContext.Provider>
  );
}
