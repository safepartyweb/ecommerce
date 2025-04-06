import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '@/lib/api/authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      console.log("Payload", action.payload)
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },
  },

  /*
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.getMe.matchFulfilled,
      (state, { payload }) => {
        state.user = payload?.user || null;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload?.user || null;
      }
    );
    builder.addMatcher(
      authApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        state.user = payload?.user || null;
      }
    );
  },

  */
});

export const { logout,setCredentials } = authSlice.actions;
export default authSlice.reducer;