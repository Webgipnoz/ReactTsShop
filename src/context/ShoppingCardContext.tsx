import { ReactNode } from "react";
import { useContext, createContext } from "react";

type ShoppingCardProviderProps = {
  children: ReactNode;
};

const ShoppingCardContext = createContext({});

export function useShoppingCard() {
  return useContext(ShoppingCardContext);
}

export function ShoppingCardProvider({ children }: ShoppingCardProviderProps) {
  return (
    <ShoppingCardContext.Provider value={{}}>
      {children}
    </ShoppingCardContext.Provider>
  );
}
