import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/lib/api/authApi';
import authReducer from './authSlice';
import { productApi } from '@/lib/api/productApi';


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware),
});

export default store