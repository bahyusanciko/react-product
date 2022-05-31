import { createSlice } from "@reduxjs/toolkit";
import { ProductsData } from "../DataProducts";

export const productSlice = createSlice({
  name: "products",
  initialState: { value: ProductsData },
  reducers: {
    addProduct: (state, action) => {
      state.value.push(action.payload);
    },

    deleteProduct: (state, action) => {
      state.value = state.value.filter((product) => product.id !== action.payload.id);
    },

    updateProduct: (state, action) => {
      state.value.map((product) => {
        if (product.id === action.payload.id) {
          product.name = action.payload.name;
          product.code = action.payload.code;
          product.oum = action.payload.oum;
          product.description = action.payload.description;
          product.price = action.payload.price;
        }
      });
    },
  },
});

export const { addProduct, deleteProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;