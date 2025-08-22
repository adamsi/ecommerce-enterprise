import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";
import authReducer from "./features/auth/authSlice";
import shoppingCartReducer from "./features/shoppingCart/shoppingCartSlice";
import toastReducer from './features/toast/toastSlice';
import categoryReducer from './features/createCategory/categorySlice';
import  createProductReducer from "./features/createProduct/createProductSlice";
import configReducer from "./features/dynamicContent/dynamicContentSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    shoppingCart: shoppingCartReducer,
    toast:toastReducer,
    auth:authReducer,
    category: categoryReducer,
    createProduct: createProductReducer,
    config: configReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
