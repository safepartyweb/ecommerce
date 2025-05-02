import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/lib/api/authApi';
import authReducer from './authSlice';
import { productApi } from '@/lib/api/productApi';
import { customerApi } from '@/lib/api/customerApi';
import cartReducer from './cartSlice.js';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware, customerApi.middleware),
});

export default store