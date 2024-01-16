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
  const [cartItems, setCartItems] = useState<Item[]>([]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  function setItemQuantity(data: { id: number; quantity: number }) {
    const { id, quantity } = data;
    setCartItems((items) => {
      const updatedItems = [...items];
      const index = updatedItems.findIndex((item) => item.id === id);

      if (index !== -1) {
        updatedItems[index] = { id, quantity };
      } else {
        updatedItems.push({ id, quantity });
      }

      console.log(updatedItems);
      return updatedItems;
    });
  }

  function removeFromCart(id: number) {
    // удаляем айтем
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
      }}
    >
      {children}
      <ShoppingCard />
    </ShoppingCardContext.Provider>
  );
}
