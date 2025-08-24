import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import resourcesReducer from './resourcesSlice';
import userReducer from './userSlice';
import eventsAndNewsReducer from './eventsAndNewsSlice.jsx';
import donateReducer from './donateSlice';
import donationFormReducer from './donationFormSlice';
import blogReducer from './blogSlice';
import communityReducer from './communitySlice';
import filtersReducer from './filtersSlice';
import opportunitiesReducer from './opportunitiesSlice';
import qaReducer from './qaSlice';
import prayerTimesReducer from './prayerTimesSlice';
import hijriCalendarReducer from './hijriCalendarSlice';
import islamicUtilitiesReducer from './islamicUtilitiesSlice';
import signupReducer from './signupSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    resources: resourcesReducer,
    user: userReducer,
    eventsAndNews: eventsAndNewsReducer,
    donate: donateReducer,
    donationForm: donationFormReducer,
    blog: blogReducer,
    community: communityReducer,
    filters: filtersReducer,
    opportunities: opportunitiesReducer,
    qa: qaReducer,
    prayerTimes: prayerTimesReducer,
    hijriCalendar: hijriCalendarReducer,
    islamicUtilities: islamicUtilitiesReducer,
    signup: signupReducer,
    auth: authReducer,
  },
});