import { configureStore } from '@reduxjs/toolkit';
import {
  authReducers,
  taskReducers,
  userReducers
} from '../reducers'

const store = configureStore({
  reducer: {
    auth: authReducers, 
    task: taskReducers,
    user: userReducers
  },
});

export default store;
