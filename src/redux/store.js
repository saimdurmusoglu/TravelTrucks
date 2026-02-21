import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campersSlice';
import favoritesReducer from './favoritesSlice';

/**
 * Global Redux Store configuration using Redux Toolkit.
 * Combines the campers and favorites slices to manage global application state.
 */
export const store = configureStore({
  reducer: {
    // Manages camper listings, filtering, and pagination
    campers: campersReducer,
    // Manages persisted favorite items
    favorites: favoritesReducer,
  },
});