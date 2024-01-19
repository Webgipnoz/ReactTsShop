import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Item {
  id: number;
  quantity: number;
}

interface CartState {
  cartItems: Item[];
  showCart: boolean;
}

const initialState: CartState = {
  cartItems: [{ id: -1, quantity: 0 }],
  showCart: false,
};

const findItemIndexById = (state: CartState, id: number) => {
  // поиск нужного item по id
  return state.cartItems.findIndex((item) => item.id === id);
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      // кнопка + 1 товар в корзине
      const id = action.payload;
      const itemIndex = findItemIndexById(state, id);

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity += 1;
      }
    },

    decrement: (state, action: PayloadAction<number>) => {
      // кнопка - 1 товар в корзине
      const id = action.payload;
      const itemIndex = findItemIndexById(state, id);

      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity -= 1;
      }
    },

    incrementByValue: (state, action: PayloadAction<number>) => {
      // кнопка submit в компоненте storeItem
      const id = action.payload;
      const itemIndex = findItemIndexById(state, id);

      state.cartItems[itemIndex].quantity += action.payload;
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      // если конкретный id есть в arr items, возвращается arr без item с таким id
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },

    toggleCartVisibility: (state) => {
      // показывать корзину или нет
      state.showCart = !state.showCart;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByValue,
  removeItemFromCart,
  toggleCartVisibility,
} = itemSlice.actions;

export const cartQuantity = (state: RootState) => {
  // Общее количество предметов в корзине, используется в Navbar для отображения
  return state.item.cartItems.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );
};

export const selectItem = (state: RootState) => state.item;

export default itemSlice.reducer;
