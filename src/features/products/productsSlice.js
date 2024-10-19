import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      name: "SNEAKERS",
      category: "Running",
      price: 65.0,
      image: "/api/placeholder/200/200",
    },
    {
      id: 2,
      name: "SNEAKERS",
      category: "Running",
      price: 65.0,
      image: "/api/placeholder/200/200",
    },
    {
      id: 3,
      name: "SNEAKERS",
      category: "Running",
      price: 65.0,
      image: "/api/placeholder/200/200",
    },
    {
      id: 4,
      name: "SNEAKERS",
      category: "Running",
      price: 65.0,
      image: "/api/placeholder/200/200",
    },
    {
      id: 5,
      name: "SNEAKERS",
      category: "Running",
      price: 65.0,
      image: "/api/placeholder/200/200",
    },
  ],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
