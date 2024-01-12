import { ReactNode, useState } from "react";
import { useContext, createContext } from "react";

import ShoppingCard from "../components/ShoppingCard";

type ShoppingCardProviderProps = {
  children: ReactNode;
};

type ShoppingCardContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type CartItem = {
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
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
        // ищем currItem в корзине, если его нет, тобишь null то мы возвращаем масив айтемов но уже с новым curritem у когорого quantity 1
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
            // если мы нашли нужный айтем уже в орзине, то просто возвращаем его с quantity + 1
          } else {
            return item;
            // либо просто возвращаем этот item без никаких изменений
          }
        });
      }
    });
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
        // если у предмета quantity 1 то мы его кикам из массива всех айтемов карзины
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
            // если мы нашли нужный айтем уже в орзине, то просто возвращаем его с quantity - 1
          } else {
            return item;
            // либо просто возвращаем этот item без никаких изменений
          }
        });
      }
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
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCard isOpen={isOpen} />
    </ShoppingCardContext.Provider>
  );
}
