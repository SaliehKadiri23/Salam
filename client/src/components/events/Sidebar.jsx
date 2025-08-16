import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Share2,
  ArrowRight,
  BookOpen,
  MessageCircle,
  CheckCircle,
  Award,
  Target,
  Sparkles,
  Globe,
  Heart,
} from "lucide-react";
import {
  setViewDate,
  setSelectedDate,
  setHoveredDate,
} from '../../redux/eventsAndNewsSlice.jsx';

// Islamic Calendar Conversion Utility
const getIslamicDate = (gregorianDate) => {
  const islamicMonths = [
    "Muharram",
    "Safar",
    "Rabi' al-Awwal",
    "Rabi' al-Thani",
    "Jumada al-Awwal",
    "Jumada al-Thani",
    "Rajab",
    "Sha'ban",
    "Ramadan",
    "Shawwal",
    "Dhu al-Qi'dah",
    "Dhu al-Hijjah",
  ];

  const gYear = gregorianDate.getFullYear();
  const gMonth = gregorianDate.getMonth() + 1;
  const gDay = gregorianDate.getDate();

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

  let l = jd - 1948440.5;
  let n = Math.floor(l / 10631);
  let a1 = Math.floor((l - 10631 * n) / 354);
  let b = Math.floor((11 * a1) / 30);
  let hYear = 30 * n + a1 - b + 1;
  let c = l - 10631 * n - 354 * a1 + 383 * b;
  let d = Math.floor((1184 * c) / 35975);
  let e = Math.floor(c / 325);
  let hMonth = Math.floor((59 * d + 2 * e) / 2);
  let hDay = c - 325 * e - Math.floor((59 * d) / 2) + 1;

  hYear = Math.max(1446, hYear);
  hMonth = Math.max(0, Math.min(11, hMonth));
  hDay = Math.max(1, Math.min(30, Math.floor(hDay)));

  return `${hDay} ${islamicMonths[hMonth]} ${hYear}`;
};

// Current Date Display Component
const CurrentDateDisplay = ({ currentDate }) => (
  <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-slate-800">Today</h3>
      <Globe className="w-5 h-5 text-emerald-600" />
    </div>
    <div className="text-center space-y-2">
      <div>
        <p className="text-xl font-bold text-emerald-600">
          {getIslamicDate(currentDate)}
        </p>
        <p className="text-xs text-slate-500">Hijri Calendar</p>
      </div>
      <div className="border-t border-slate-200 pt-2">
        <p className="text-lg font-semibold text-slate-700">
          {currentDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-xs text-slate-500">Gregorian Calendar</p>
      </div>
    </div>
  </div>
);

// Interactive Calendar Component
const InteractiveCalendar = () => {
  const dispatch = useDispatch();
  const { viewDate, selectedDate, eventsData, hoveredDate } = useSelector(state => state.eventsAndNews);
  const date = new Date(viewDate);

  const navigateMonth = (direction) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + direction);
    dispatch(setViewDate(newDate.toISOString()));
  };

  const getMonthYear = (d) =>
    d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const getCalendarDays = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= daysInMonth; day++) days.push(day);
    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    const targetDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      day
    );
    return eventsData.filter(
      (event) =>
        new Date(event.date).toDateString() === targetDate.toDateString()
    );
  };

  const hasEvents = (day) => getEventsForDate(day).length > 0;

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-emerald-50 rounded-lg transition-all duration-200 hover:scale-105"
        >
          <ChevronLeft className="w-4 h-4 text-slate-600" />
        </button>
        <h3 className="font-semibold text-slate-800">
          {getMonthYear(date)}
        </h3>
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-emerald-50 rounded-lg transition-all duration-200 hover:scale-105"
        >
          <ChevronRight className="w-4 h-4 text-slate-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className="text-xs font-medium text-slate-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 relative">
        {getCalendarDays().map((day, index) => (
          <div key={index} className="relative">
            {day && (
              <button
                onClick={() => dispatch(setSelectedDate(day))}
                onMouseEnter={() => dispatch(setHoveredDate(day))}
                onMouseLeave={() => dispatch(setHoveredDate(null))}
                className={`h-8 w-8 rounded-lg text-sm transition-all duration-200 hover:scale-105 relative ${
                  day === selectedDate
                    ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg"
                    : hasEvents(day)
                    ? "bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-md"
                    : "hover:bg-emerald-50 text-slate-700"
                }`}
              >
                {day}
                {hasEvents(day) && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
                )}
              </button>
            )}

            {hoveredDate === day && hasEvents(day) && (
              <div className="absolute z-50 bg-white/90 backdrop-blur-xl border border-white/30 text-slate-800 text-xs rounded-xl p-3 shadow-2xl -top-16 left-1/2 transform -translate-x-1/2 min-w-40 max-w-48">
                <div className="space-y-1">
                  {getEventsForDate(day).map((event) => (
                    <div
                      key={event.id}
                      className="font-medium text-emerald-800 whitespace-nowrap truncate"
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/90"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Upcoming Events Component
const UpcomingEvents = ({ upcomingEvents }) => (
  <div className="w-full flex justify-center items-center">
    <div className="bg-white/70 w-full sm:w-[90%] sm:max-w-[600px] lg:w-full backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6">
      <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-emerald-600" />
        Upcoming Events
      </h3>
      <div className="space-y-3">
        {upcomingEvents.length > 0 ? upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="group p-3 rounded-xl hover:bg-emerald-50/50 transition-all duration-300 cursor-pointer border border-transparent hover:border-emerald-200"
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 truncate group-hover:text-emerald-700 transition-colors">
                  {event.title}
                </p>
                <p className="text-sm text-slate-600">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-xs text-slate-500">{event.time}</p>
              </div>
            </div>
          </div>
        )) : (<div className="text-center text-sm text-gray-600">No Upcoming Events...</div>)}
      </div>
    </div>
  </div>
);

const Sidebar = ({ upcomingEvents }) => {
  const [currentDate] = React.useState(new Date());

  return (
    <div className="lg:col-span-1 space-y-6">
      <CurrentDateDisplay currentDate={currentDate} />
      <InteractiveCalendar />
      <UpcomingEvents upcomingEvents={upcomingEvents} />
    </div>
  );
};

export default Sidebar;