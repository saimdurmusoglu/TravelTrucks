import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCampers } from '../services/api';

/**
 * Async Thunk for fetching campers from the backend.
 * Requirement: Handles asynchronous API requests with support for 
 * backend-based filtering and pagination via params.
 */
export const getCampers = createAsyncThunk(
  'campers/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetchCampers(params);
      // Handles both direct array responses and object-wrapped (e.g., MockAPI) items
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
    // Clears the list and resets pagination state for fresh searches
    resetItems: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    // Increases current page for infinite scroll or "Load More" functionality
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

        // Extract items regardless of API response structure
        const newItems = Array.isArray(action.payload) 
          ? action.payload 
          : action.payload.items || [];

        // Technical Spec: Logic to append new data or replace it (for new searches)
        if (state.page === 1) {
          state.items = newItems;
        } else {
          state.items = [...state.items, ...newItems];
        }

        /**
         * Requirement: Pagination Mechanism (Load More control)
         * If the returned items are fewer than the limit (4), disable 'hasMore'.
         */
        if (newItems.length < 4) {
          state.hasMore = false;
        } else {
          state.hasMore = true;
        }
      })
      .addCase(getCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // Prevents further fetch attempts on failure
        state.hasMore = false;
      });
  },
});

export const { resetItems, incrementPage } = campersSlice.actions;
export default campersSlice.reducer;