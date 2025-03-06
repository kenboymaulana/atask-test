// types
import { octokit } from '@/utils/octokit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const namespace = 'Users';

export const userSearch = createAsyncThunk(`${namespace}/userSearch`, async (payload: { username: string }) => {
  const data = await octokit.request(`GET /search/users?q=${payload.username}&per_page=5`, );
  return data;
});

const initialState = {
  namespace,
  status: '',
  data: {
    items: [],
    total_count: 0,
    incomplete_results: false,
  },
};

// ==============================|| SLICE - MENU ||============================== //

const MainReducer = createSlice({
  name: namespace,
  initialState,
  reducers: {
    resetState(state) {
      Object.assign(state, {});
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSearch.pending, (state) => {
      state.status= '';
      state.data = {
        items: [],
        total_count: 0,
        incomplete_results: true,
      }
    });
    builder.addCase(userSearch.rejected, (state) => {
      toast('Oops, Failed to send Request.', {
        type: 'error'
      });
      state.status = 'Failed';
      state.data = {
        items: [],
        total_count: 0,
        incomplete_results: true,
      }
    });
    builder.addCase(userSearch.fulfilled, (state, { payload }) => {
      state.data.items = payload.data.items;
      state.data.total_count = payload.data.total_count;
      state.data.incomplete_results = payload.data.incomplete_results;
    });
  },
});

export const { resetState } = MainReducer.actions;

export default MainReducer.reducer;
