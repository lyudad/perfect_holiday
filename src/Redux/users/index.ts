import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const reducer = combineReducers({
  person: userReducer,
});

export default reducer;
