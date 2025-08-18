import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import resourcesReducer from './resourcesSlice';
import userReducer from './userSlice';
import eventsAndNewsReducer from './eventsAndNewsSlice.jsx';
import donateReducer from './donateSlice';
import donationFormReducer from './donationFormSlice';
import blogReducer from './blogSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    resources: resourcesReducer,
    user: userReducer,
    eventsAndNews: eventsAndNewsReducer,
    donate: donateReducer,
    donationForm: donationFormReducer,
    blog: blogReducer,
  },
});