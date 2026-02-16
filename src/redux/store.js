import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  // DevTools'un açık olduğundan emin olmak için (normalde otomatiktir):
  devTools: true, 
});