import { ReactNode, useState } from "react";
import { useContext, createContext } from "react";

type ShoppingCardProviderProps = {
  children: ReactNode;
};

type ShoppingCardContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCardContext = createContext({} as ShoppingCardContext);

export function useShoppingCard() {
  return useContext(ShoppingCardContext);
}

export default function ShoppingCardProvider({
  children,
}: ShoppingCardProviderProps) {
  const [cartItems, setCatItems] = useState<CartItem[]>([]);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCatItems((currItems) => {
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
    setCatItems((currItems) => {
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
    setCatItems((currItem) => {
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
      }}
    >
      {children}
    </ShoppingCardContext.Provider>
  );
}
