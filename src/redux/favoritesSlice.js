import { createSlice } from '@reduxjs/toolkit';

// Sayfa yüklendiğinde localStorage'dan favorileri çek
const initialState = {
  items: JSON.parse(localStorage.getItem('favorites')) || [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      const index = state.items.indexOf(camperId);
      
      if (index >= 0) {
        state.items.splice(index, 1); // Varsa çıkar
      } else {
        state.items.push(camperId); // Yoksa ekle
      }
      
      // Her değişiklikte localStorage'ı güncelle
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;