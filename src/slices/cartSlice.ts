import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type CartItem = {
  id: number;
  name: string;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
};

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: any, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      const todate =new Date().toISOString().slice(0, 10) 
      const body={
        userId: 2, 
        products: [{ productId: action.payload.id, quantity: action.payload.quantity}] ,
        date:todate
      }
      axios.post('https://fakestoreapi.com/carts',body,)
    },
    resetCart: (state: any, action: PayloadAction<CartItem>) => {
      state.items = [];
    }

  },
});

export const { addToCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
