import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    fetchProductsSuccess: (state, action) => {
      state.items = action.payload;
      state.status = "succeeded";
    },
    fetchProductsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    setLoading: (state) => {
      state.status = "loading";
    },
  },
});

export const { fetchProductsSuccess, fetchProductsFailure, setLoading } =
  productsSlice.actions;
export default productsSlice.reducer;
