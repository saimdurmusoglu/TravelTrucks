import { createSlice } from '@reduxjs/toolkit';

/**
 * favoritesSlice manages the user's favorited campers.
 * Requirement: State is persisted across page refreshes using LocalStorage.
 */
const initialState = {
  // Retrieve favorited items from LocalStorage on initial load
  items: JSON.parse(localStorage.getItem('favorites')) || [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    /**
     * Toggles a camper's favorite status.
     * Adds the ID if not present, removes it if it already exists.
     */
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      const index = state.items.indexOf(camperId);
      
      if (index >= 0) {
        state.items.splice(index, 1); // Remove if already favorited
      } else {
        state.items.push(camperId); // Add if not in favorites
      }
      
      // Update LocalStorage to ensure data persistence
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;