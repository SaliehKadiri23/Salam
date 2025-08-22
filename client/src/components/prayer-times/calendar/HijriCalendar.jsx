import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  incrementHijriMonth, 
  decrementHijriMonth,
  hijriMonths,
  islamicEvents 
} from "../../../redux/hijriCalendarSlice";

const HijriCalendar = () => {
  const dispatch = useDispatch();
  const { currentHijriMonth, currentHijriDate } = useSelector((state) => state.hijriCalendar);
  
  const hijriDays = useMemo(
    () => Array.from({ length: 30 }, (_, i) => i + 1),
    []
  );
  const currentDay = currentHijriDate.day;

  const handlePrevMonth = () => {
    dispatch(decrementHijriMonth());
  };

  const handleNextMonth = () => {
    dispatch(incrementHijriMonth());
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">
                {hijriMonths[currentHijriMonth]} {currentHijriDate.year}
              </h3>
              <p className="text-sm text-gray-600">Hijri Calendar</p>
            </div>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
              <div
                key={day}
                className="text-center text-sm font-semibold text-gray-500 py-2"
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
                    ? "bg-gradient-to-br from-emerald-500 to-amber-500 text-white font-bold shadow-lg"
                    : islamicEvents[day]
                    ? "bg-amber-100 text-amber-700 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* Islamic Events */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Islamic Events This Month
          </h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-xl">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                9
              </div>
              <div>
                <p className="font-semibold text-gray-800">Day of Ashura</p>
                <p className="text-sm text-gray-600">
                  Day of fasting and remembrance
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-xl">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                12
              </div>
              <div>
                <p className="font-semibold text-gray-800">Mawlid an-Nabi</p>
                <p className="text-sm text-gray-600">
                  Birthday of Prophet Muhammad (PBUH)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HijriCalendar;