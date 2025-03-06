// types
import { octokit } from '@/utils/octokit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const namespace = 'Repos';

export const userRepos = createAsyncThunk<{username: string, items: {data: []}}, { username: string }>(`${namespace}/userRepos`, async (payload) => {
  const data = await octokit.request(`GET /users/${payload.username}/repos`, );
  const resData = {
    username: payload.username,
    items: data,
  }
  return resData;
});

const initialState = {
  namespace,
  status: '',
  userRepos: {} as Record<string, { items: []; total_count: number; incomplete_results: boolean }>,
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
    builder.addCase(userRepos.pending, (state, { meta }: { meta: { arg: { username: string } } }) => {
      const { username } = meta.arg;
      state.status = '';
      delete state.userRepos[username]
    });
    builder.addCase(userRepos.rejected, (state, action) => {
      const { username } = action.payload as { username: string };
      toast('Oops, Failed to send Request.', {
        type: 'error'
      });
      state.status = 'Failed';
      delete state.userRepos[username];
    });
    builder.addCase(userRepos.fulfilled, (state, { payload }) => {
      state.userRepos[payload.username] = {
        items: payload.items.data,
        total_count: payload.items.data.length || 0,
        incomplete_results: !Boolean(payload.items.data),
      }
    });
  },
});

export const { resetState } = MainReducer.actions;

export default MainReducer.reducer;
