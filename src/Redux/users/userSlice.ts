import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'Components/Access/types';
import userOperations from './userOperation';

export interface TUserState {
  loggedIn: boolean;
  user: IUser | null;
  token: string | null;
}

const initialState: TUserState = {
  loggedIn: false,
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // omit reducer cases
  },
  extraReducers: builder => {
    builder
      .addCase(
        userOperations.signIn.fulfilled,
        (state, action: PayloadAction<{ user: IUser }>) => {
          state.loggedIn = true;
          state.user = action.payload.user;
          state.token = action.payload.user.token;
        },
      )
      .addCase(userOperations.signOut.fulfilled, state => {
        state.loggedIn = false;
        state.user = null;
        state.token = null;
      });
  },
});

export default userSlice.reducer;
