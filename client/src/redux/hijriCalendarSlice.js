import { createSlice } from '@reduxjs/toolkit';

// Islamic calendar data and events
export const hijriMonths = [
  "Muharram",
  "Safar",
  "Rabi' al-awwal",
  "Rabi' al-thani",
  "Jumada al-awwal",
  "Jumada al-thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhu al-Qi'dah",
  "Dhu al-Hijjah",
];

export const islamicEvents = {
  0: { // Muharram
    1: "Islamic New Year",
    10: "Day of Ashura"
  },
  2: { // Rabi' al-Awwal
    12: "Mawlid an-Nabi"
  },
  6: { // Rajab
    27: "Isra and Mi'raj"
  },
  8: { // Ramadan
    1: "First day of Ramadan",
    27: "Laylat al-Qadr"
  },
  9: { // Shawwal
    1: "Eid al-Fitr"
  },
  11: { // Dhu al-Hijjah
    9: "Day of Arafah",
    10: "Eid al-Adha"
  }
};

/**
 * Helper function to get Islamic events for a specific month
 * @param {number} monthIndex - 0-based month index (0-11)
 * @returns {Object} - Object containing events for the specified month
 */
export function getIslamicEventsForMonth(monthIndex) {
  return islamicEvents[monthIndex] || {};
}

const today = new Date();

function gregorianToHijri(gregorianDate) {
  // Validate input
  if (!(gregorianDate instanceof Date) || isNaN(gregorianDate)) {
    throw new Error(
      "Invalid date provided. Please provide a valid Date object."
    );
  }

  // Hijri month names
  const hijriMonths = [
    "Muharram",
    "Safar",
    "Rabi' al-awwal",
    "Rabi' al-thani",
    "Jumada al-awwal",
    "Jumada al-thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qi'dah",
    "Dhu al-Hijjah",
  ];

  // Get Gregorian date components
  const gYear = gregorianDate.getFullYear();
  const gMonth = gregorianDate.getMonth() + 1; // JavaScript months are 0-indexed
  const gDay = gregorianDate.getDate();

  // Calculate Julian Day Number
  let a = Math.floor((14 - gMonth) / 12);
  let y = gYear - a;
  let m = gMonth + 12 * a - 3;

  let jd =
    gDay +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) +
    1721119;

  // Convert Julian Day to Hijri
  // Using the algorithm based on astronomical calculations
  // Add 1 day to align with commonly used civil Hijri calendars
  let l = jd - 1948440 + 10632 + 1; // Adjustment to match civil calendar dates
  let n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;

  let j =
    Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
    Math.floor(l / 5670) * Math.floor((43 * l) / 15238);

  l =
    l -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;

  let hMonth = Math.floor((24 * l) / 709);
  let hDay = l - Math.floor((709 * hMonth) / 24);
  let hYear = 30 * n + j - 30;

  // Adjust for edge cases
  if (hDay === 0) {
    hMonth--;
    if (hMonth === 0) {
      hMonth = 12;
      hYear--;
    }
    // Calculate days in previous month
    hDay =
      isHijriLeapYear(hYear) && hMonth === 12 ? 30 : hMonth % 2 === 1 ? 30 : 29;
  }

  return {
    year: hYear,
    month: hMonth,
    day: hDay,
    monthName: hijriMonths[hMonth - 1],
    formatted: `${hDay} ${hijriMonths[hMonth - 1]} ${hYear} AH`,
    dayOfWeek: gregorianDate.getDay(), // Same day of week
  };
}

/**
 * Helper function to determine if a Hijri year is a leap year
 * @param {number} hYear - Hijri year
 * @returns {boolean} - True if leap year, false otherwise
 */
function isHijriLeapYear(hYear) {
  // In the 30-year cycle, years 2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29 are leap years
  const leapYears = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];
  return leapYears.includes(hYear % 30);
}

/**
 * Helper function to get the number of days in a Hijri month
 * @param {number} monthIndex - 0-based month index (0-11)
 * @param {number} year - Hijri year
 * @returns {number} - Number of days in the specified month
 */
function getDaysInHijriMonth(monthIndex, year) {
  // Validate inputs
  if (monthIndex < 0 || monthIndex > 11) {
    throw new Error('Month index must be between 0 and 11');
  }
  if (!year || year < 1) {
    throw new Error('Year must be a positive number');
  }

  // Convert 0-based index to 1-based month number for calculation
  const monthNumber = monthIndex + 1;
  
  // In Islamic calendar:
  // Odd months (1, 3, 5, 7, 9, 11) have 30 days
  // Even months (2, 4, 6, 8, 10) have 29 days
  // Month 12 (Dhu al-Hijjah) has 29 days in common years, 30 in leap years
  
  let days;
  if (monthNumber % 2 === 1) {
    // Odd months have 30 days
    days = 30;
  } else if (monthNumber === 12) {
    // 12th month: 30 days in leap years, 29 in common years
    const isLeap = isHijriLeapYear(year);
    days = isLeap ? 30 : 29;
  } else {
    // Even months (except 12th) have 29 days
    days = 29;
  }
  
  return days;
}


const initialState = {
  currentHijriMonth: gregorianToHijri(today).month - 1,
  currentHijriDate: {
    day: gregorianToHijri(today).day,
    month: gregorianToHijri(today).month,
    year: gregorianToHijri(today).year,
  },
};

export const hijriCalendarSlice = createSlice({
  name: 'hijriCalendar',
  initialState,
  reducers: {
    setCurrentHijriMonth: (state, action) => {
      state.currentHijriMonth = action.payload;
    },
    incrementHijriMonth: (state) => {
      if (state.currentHijriMonth === 11) {
        // Transition from Dhu al-Hijjah (11) to Muharram (0) and increment year
        state.currentHijriMonth = 0;
        state.currentHijriDate.month = 1;
        state.currentHijriDate.year += 1;
      } else {
        // Normal month increment
        state.currentHijriMonth += 1;
        state.currentHijriDate.month = state.currentHijriMonth + 1;
      }
    },
    decrementHijriMonth: (state) => {
      if (state.currentHijriMonth === 0) {
        // Transition from Muharram (0) to Dhu al-Hijjah (11) and decrement year
        state.currentHijriMonth = 11;
        state.currentHijriDate.month = 12;
        state.currentHijriDate.year -= 1;
      } else {
        // Normal month decrement
        state.currentHijriMonth -= 1;
        state.currentHijriDate.month = state.currentHijriMonth + 1;
      }
    },
    setCurrentHijriDate: (state, action) => {
      state.currentHijriDate = { ...state.currentHijriDate, ...action.payload };
    },
    setHijriDay: (state, action) => {
      state.currentHijriDate.day = action.payload;
    },
    setHijriYear: (state, action) => {
      state.currentHijriDate.year = action.payload;
    },
    updateFullHijriDate: (state, action) => {
      const { day, month, year } = action.payload;
      state.currentHijriDate = { day, month, year };
      state.currentHijriMonth = month - 1; // Convert month number to index
    },
  },
});

export const {
  setCurrentHijriMonth,
  incrementHijriMonth,
  decrementHijriMonth,
  setCurrentHijriDate,
  setHijriDay,
  setHijriYear,
  updateFullHijriDate,
} = hijriCalendarSlice.actions;

// Export utility functions
export { gregorianToHijri, isHijriLeapYear, getDaysInHijriMonth };

export default hijriCalendarSlice.reducer;