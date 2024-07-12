import { configureStore } from '@reduxjs/toolkit';
import {
  authReducers,
  taskReducers,
  userReducers,
  commentReducers
} from '../reducers'

const store = configureStore({
  reducer: {
    auth: authReducers, 
    task: taskReducers,
    user: userReducers,
    comment: commentReducers
  },
});

export default store;
