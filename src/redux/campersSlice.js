import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCampers } from '../services/api';

/**
 * Teknik Şartname: API istekleri asenkron olarak Redux Thunk ile yönetilir.
 * Backend tarafında filtreleme ve sayfalandırma için params iletilir.
 */
export const getCampers = createAsyncThunk(
  'campers/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchCampers(params);
      // MockAPI genellikle { items: [], total: 10 } yapısında veri döner.
      // Eğer response.data direkt diziyse onu, değilse içindeki items'ı alıyoruz.
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    hasMore: true,
    filters: {
      location: "",
      form: "",
      features: {
        AC: false,
        kitchen: false,
        TV: false,
        bathroom: false,
        transmission: "",
      }
    }
  },
  reducers: {
    resetItems: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCampers.fulfilled, (state, action) => {
        state.isLoading = false;

        // MockAPI veri yapısına göre veri çekme (Kritik Düzeltme)
        const newItems = Array.isArray(action.payload) 
          ? action.payload 
          : action.payload.items || [];

        // Eğer ilk sayfa ise listeyi sıfırdan oluştur, değilse üzerine ekle
        if (state.page === 1) {
          state.items = newItems;
        } else {
          state.items = [...state.items, ...newItems];
        }

        // Şartname: Sayfalandırma mekanizması (Load More kontrolü)
        // Eğer gelen veri limit (4) değerinden azsa buton gizlenir.
        if (newItems.length < 4) {
          state.hasMore = false;
        } else {
          state.hasMore = true;
        }
      })
      .addCase(getCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // Hata durumunda da sonsuz döngü olmaması için hasMore kapatılabilir
        state.hasMore = false;
      });
  },
});

export const { resetItems, incrementPage } = campersSlice.actions;
export default campersSlice.reducer;