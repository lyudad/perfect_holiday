/* eslint no-param-reassign: "off" */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'Components/Access/types';

interface TUserState {
  readonly loggedIn: boolean;
  readonly user: IUser;
}

const initialState: TUserState = {
  loggedIn: false,
  user: { id: '', access_token: '', role: '' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ user: IUser }>) => {
      state.loggedIn = true;
      state.user = {
        id: action.payload.user.id,
        role: action.payload.user.role,
        access_token: action.payload.user.access_token,
      };
    },
    signOut: state => {
      state.loggedIn = false;
      state.user = { id: '', access_token: '', role: '' };
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
