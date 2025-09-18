import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import loginSlice from './features/loginSlice'
import cartSlice from './features/cartSlice'
import globalSlice from './features/globalSlice'
import orderReducer from './features/orderSlice'
import { productsApiSlice } from './services/products';
import { ordersApiSlice } from './services/orders';
import networkSlice from './features/network';

const persistCartConfig = {
  key: "cart",
  storage,
}

const persistedCart = persistReducer(persistCartConfig, cartSlice)

export const store = configureStore({
  reducer: {
    network: networkSlice,
    global: globalSlice,
    cart: persistedCart,   // ✅ cart يتخزن
    login: loginSlice,
    orders: orderReducer,  // ❌ مش متخزن
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [ordersApiSlice.reducerPath]: ordersApiSlice.reducer
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(productsApiSlice.middleware, ordersApiSlice.middleware)
})

export const persistor = persistStore(store)
