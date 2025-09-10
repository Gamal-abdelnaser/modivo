import { toaster } from "@/components/ui/toaster";
import { addItemToShoppingCart } from "@/utils/util";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {

  cartProducts: [],

};  

const cartSlice = createSlice({
  name:'cart',
  initialState,
  reducers:{
    addToCart: (state, action) =>{
      state.cartProducts = addItemToShoppingCart(action.payload, state.cartProducts)
    },
    removeFromCart: (state, action) =>{
      state.cartProducts = state.cartProducts.filter(item => item.id !== action.payload)
      toaster.create({
        title: "Removed from Your cart",
        // description: "All items have been removed from your cart",
        type: 'success'
      })
    },
    updateCartQuantity : (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartProducts.find(item => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },

    clearCart: (state) =>{
      state.cartProducts = [];
      toaster.create({
        title: "Your Cart is empty now",
        description: "All items have been removed from your cart",
        type: 'warning'
      })
    },
  }
})

// Update the quantity of a cart item


export const { addToCart, removeFromCart, clearCart, updateCartQuantity } = cartSlice.actions;
export const selectCart = ({ cart }) => cart;
export default cartSlice.reducer;