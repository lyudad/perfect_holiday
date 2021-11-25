import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUserState } from './userSlice';

const token = {
  set(token: TUserState) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const signIn = createAsyncThunk('auth/login', async credentials => {
  try {
    const { data } = await axios.post('/auth/login', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    // error.message
  }
});

const signOut = createAsyncThunk('auth/logout', async () => {
  try {
    await axios.post('/auth/logout');
    token.unset();
  } catch (error) {
    // error.message
  }
});

export default { signIn, signOut };
