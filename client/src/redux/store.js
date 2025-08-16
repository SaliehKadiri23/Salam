import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import resourcesReducer from './resourcesSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    resources: resourcesReducer,
    user: userReducer,
  },
});