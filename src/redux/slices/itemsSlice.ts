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
  totalQuantity: number;
}

const initialState: CartState = {
  cartItems: [],
  showCart: false,
  totalQuantity: 0,
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
      } else {
        // если нет такого массива то добавляем его в список
        state.cartItems.push({ id, quantity: 1 });
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

    incrementByValue: (state, action) => {
      // кнопка submit в компоненте storeItem
      const { id, value } = action.payload;

      const itemIndex = findItemIndexById(state, id);

      if (itemIndex !== -1) {
        // Используйте immer для создания измененной копии состояния
        state.cartItems = state.cartItems.map((item, index) =>
          index === itemIndex
            ? { ...item, quantity: item.quantity + value }
            : item
        );
      } else {
        // Используйте immer для создания измененной копии состояния
        state.cartItems = [...state.cartItems, { id, quantity: value }];
      }

      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    removeItemFromCart: (state, action: PayloadAction<number>) => {
      // если конкретный id есть в arr items, возвращается arr без item с таким id
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
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

export const selectItem = (state: RootState) => state.item;

export default itemSlice.reducer;
