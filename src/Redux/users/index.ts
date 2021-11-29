import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const reducer = combineReducers({
  user: userReducer,
});

export default reducer;
