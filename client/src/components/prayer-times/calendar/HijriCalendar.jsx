import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  incrementHijriMonth,
  decrementHijriMonth,
  hijriMonths,
  islamicEvents,
  getDaysInHijriMonth,
  getIslamicEventsForMonth
} from "../../../redux/hijriCalendarSlice";

const HijriCalendar = () => {
  const dispatch = useDispatch();
  const { currentHijriMonth, currentHijriDate } = useSelector((state) => state.hijriCalendar);
  
  const hijriDays = useMemo(() => {
    // Get days in current Hijri month using the imported function
    const daysInMonth = getDaysInHijriMonth(currentHijriMonth, currentHijriDate.year);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return days;
  }, [currentHijriMonth, currentHijriDate.year]);

  // Get events for the current month
  const currentMonthEvents = useMemo(() => {
    const events = getIslamicEventsForMonth(currentHijriMonth);
    return events;
  }, [currentHijriMonth]);

  const currentDay = currentHijriDate.day;

  const handlePrevMonth = () => {
    dispatch(decrementHijriMonth());
  };

  const handleNextMonth = () => {
    dispatch(incrementHijriMonth());
  };

  return (
    <div className="bg-white dark:bg-black/85 rounded-2xl dark:border dark:border-emerald-600 shadow-xl p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-full hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {hijriMonths[currentHijriMonth]} {currentHijriDate.year}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Hijri Calendar
              </p>
            </div>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-full hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600  transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <div
                key={`${day}-${index}`}
                className="text-center text-sm font-semibold text-gray-500 dark:text-gray-200 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            <div className="col-start-3"></div>
            {hijriDays.map((day) => (
              <div
                key={day}
                className={`aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all ${
                  day === currentDay
                    ? "bg-gradient-to-br from-emerald-500 to-amber-500 text-white dark:text-black font-bold shadow-lg"
                    : currentMonthEvents[day]
                    ? "bg-amber-100 text-amber-700 font-semibold"
                    : "hover:bg-gray-100 dark:text-white dark:hover:bg-gray-500"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Islamic Events */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Islamic Events This Month
          </h4>
          <div className="space-y-3">
            {Object.keys(currentMonthEvents).length > 0 ? (
              Object.entries(currentMonthEvents)
                .slice(0, 3) // Show first 3 events
                .map(([day, eventName], index) => (
                  <div
                    key={day}
                    className={`flex items-center space-x-3 p-3 rounded-xl ${
                      index % 2 === 0 ? "bg-amber-50" : "bg-emerald-50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        index % 2 === 0 ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                    >
                      {day}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{eventName}</p>
                      <p className="text-sm text-gray-600">
                        {hijriMonths[currentHijriMonth]} {day},{" "}
                        {currentHijriDate.year} AH
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <div className="flex items-center justify-center p-6 bg-gray-50 rounded-xl">
                <p className="text-gray-500 text-sm">
                  No Islamic events this month
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HijriCalendar;