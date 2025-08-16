import React, { useState, useMemo } from "react";
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

// Mock TbBuildingMosque component since we can't import react-icons
const TbBuildingMosque = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L8 6h8l-4-4zm0 18c-4 0-8-2-8-6V8h16v6c0 4-4 6-8 6z" />
  </svg>
);

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
const InteractiveCalendar = ({
  viewDate,
  setViewDate,
  selectedDate,
  setSelectedDate,
  eventsData,
  hoveredDate,
  setHoveredDate,
}) => {
  const navigateMonth = (direction) => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setViewDate(newDate);
  };

  const getMonthYear = (date) =>
    date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const getCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
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
      viewDate.getFullYear(),
      viewDate.getMonth(),
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
          {getMonthYear(viewDate)}
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
        {getCalendarDays().map((date, index) => (
          <div key={index} className="relative">
            {date && (
              <button
                onClick={() => setSelectedDate(date)}
                onMouseEnter={() => setHoveredDate(date)}
                onMouseLeave={() => setHoveredDate(null)}
                className={`h-8 w-8 rounded-lg text-sm transition-all duration-200 hover:scale-105 relative ${
                  date === selectedDate
                    ? "bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg"
                    : hasEvents(date)
                    ? "bg-gradient-to-br from-emerald-400 to-green-500 text-white shadow-md"
                    : "hover:bg-emerald-50 text-slate-700"
                }`}
              >
                {date}
                {hasEvents(date) && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
                )}
              </button>
            )}

            {hoveredDate === date && hasEvents(date) && (
              <div className="absolute z-50 bg-white/90 backdrop-blur-xl border border-white/30 text-slate-800 text-xs rounded-xl p-3 shadow-2xl -top-16 left-1/2 transform -translate-x-1/2 min-w-40 max-w-48">
                <div className="space-y-1">
                  {getEventsForDate(date).map((event) => (
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

// Tab Navigation Component
const TabNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "events", label: "Events", icon: Calendar },
    { id: "news", label: "News", icon: MessageCircle },
  ];

  return (
    <div className="flex bg-white/70 backdrop-blur-xl rounded-xl shadow-lg border border-white/20 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            activeTab === tab.id
              ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md"
              : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50"
          }`}
        >
          <tab.icon className="w-4 h-4" />
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// Category Filters Component
const CategoryFilters = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => (
  <div className="flex flex-wrap gap-3">
    {categories.map((category) => (
      <button
        key={category.id}
        onClick={() => setSelectedCategory(category.id)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
          selectedCategory === category.id
            ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg"
            : "bg-white/70 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 border border-white/20 backdrop-blur-xl"
        }`}
      >
        <category.icon className="w-4 h-4" />
        <span>{category.label}</span>
      </button>
    ))}
  </div>
);

// Event Card Component
const EventCard = ({ event, registeredEvents, handleEventRegistration }) => (
  <div className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
    <div className="aspect-video overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        onError={(e) => {
          e.target.src =
            "https://images.unsplash.com/photo-1564769625905-50c888ceb1e8?w=400&h=250&fit=crop&crop=center";
        }}
      />
    </div>
    <div className="p-6">
      <h3 className="font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
        {event.title}
      </h3>
      <p className="text-slate-600 text-sm mb-4">{event.description}</p>
      <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Award className="w-4 h-4" />
          <span>{event.attendees}</span>
        </div>
      </div>
      {event.registrationRequired && (
        <button
          onClick={() => handleEventRegistration(event.id)}
          className={`w-full py-2 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
            registeredEvents.has(event.id)
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg"
          }`}
        >
          {registeredEvents.has(event.id) ? (
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span>Registered</span>
            </div>
          ) : (
            "Register Now"
          )}
        </button>
      )}
    </div>
  </div>
);

// Event List Item Component
const EventListItem = ({
  event,
  registeredEvents,
  handleEventRegistration,
}) => (
  <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    {/* Mobile Layout */}
    <div className="block sm:hidden">
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 mb-1 text-sm">
            {event.title}
          </h3>
          <div className="flex items-center space-x-1 text-xs text-slate-600 mb-1">
            <Clock className="w-3 h-3" />
            <span>
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              • {event.time}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-slate-600">
            <Award className="w-3 h-3" />
            <span>{event.attendees} attending</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-xs text-slate-600">
          <MapPin className="w-3 h-3" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
            <Share2 className="w-4 h-4 text-slate-600" />
          </button>
          {event.registrationRequired && (
            <button
              onClick={() => handleEventRegistration(event.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                registeredEvents.has(event.id)
                  ? "bg-green-100 text-green-700"
                  : "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
              }`}
            >
              {registeredEvents.has(event.id) ? "Registered" : "Register"}
            </button>
          )}
        </div>
      </div>
    </div>

    {/* Desktop Layout */}
    <div className="hidden sm:block">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-800 mb-2">{event.title}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span>
                {new Date(event.date).toLocaleDateString()} • {event.time}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 flex-shrink-0" />
              <span>{event.attendees} attending</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Share2 className="w-5 h-5 text-slate-600" />
          </button>
          {event.registrationRequired && (
            <button
              onClick={() => handleEventRegistration(event.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                registeredEvents.has(event.id)
                  ? "bg-green-100 text-green-700"
                  : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg"
              }`}
            >
              {registeredEvents.has(event.id) ? "Registered" : "Register"}
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

// News Card Component
const NewsCard = ({ news }) => (
  <article className="group bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
    <div className="aspect-video overflow-hidden">
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
          {news.category}
        </span>
        <span className="text-sm text-slate-500">{news.date}</span>
      </div>
      <h3 className="font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors">
        {news.title}
      </h3>
      <p className="text-slate-600 text-sm mb-4">{news.excerpt}</p>
      <button className="flex items-center space-x-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
        <span>Read More</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </article>
);

// Events Content Component
const EventsContent = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  featuredEvents,
  filteredEvents,
  registeredEvents,
  handleEventRegistration,
}) => (
  <>
    <CategoryFilters
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />

    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        Featured Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {featuredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            registeredEvents={registeredEvents}
            handleEventRegistration={handleEventRegistration}
          />
        ))}
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">All Events</h2>
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <EventListItem
            key={event.id}
            event={event}
            registeredEvents={registeredEvents}
            handleEventRegistration={handleEventRegistration}
          />
        ))}
      </div>
    </div>
  </>
);

// News Content Component
const NewsContent = ({ newsData }) => (
  <div>
    <h2 className="text-2xl font-bold text-slate-800 mb-6">Latest News</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {newsData.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </div>
  </div>
);

// Sidebar Component
const Sidebar = ({
  currentDate,
  viewDate,
  setViewDate,
  selectedDate,
  setSelectedDate,
  eventsData,
  hoveredDate,
  setHoveredDate,
  upcomingEvents,
}) => (
  <div className="lg:col-span-1 space-y-6">
    <CurrentDateDisplay currentDate={currentDate} />
    <InteractiveCalendar
      viewDate={viewDate}
      setViewDate={setViewDate}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      eventsData={eventsData}
      hoveredDate={hoveredDate}
      setHoveredDate={setHoveredDate}
    />
    <UpcomingEvents upcomingEvents={upcomingEvents} />
  </div>
);

// Main App Component
const IslamicEventsPage = () => {
  const [currentDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState("events");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [registeredEvents, setRegisteredEvents] = useState(new Set());
  const [hoveredDate, setHoveredDate] = useState(null);

  // Events Data
  const eventsData = useMemo(
    () => [
      {
        id: 1,
        title: "Jummah Prayer & Khutbah",
        date: new Date(2020, 9, 25),
        time: "1:15 PM",
        location: "Main Prayer Hall",
        category: "prayer",
        attendees: 150,
        featured: true,
        registrationRequired: false,
        image:
          "https://images.unsplash.com/photo-1564769625905-50c888ceb1e8?w=400&h=250&fit=crop&crop=center",
        description:
          "Weekly congregational Friday prayer with inspiring khutbah on community unity.",
      },
      {
        id: 2,
        title: "Community Service Day",
        date: new Date(2024, 9, 26),
        time: "10:00 AM",
        location: "Local Food Bank",
        category: "community",
        attendees: 80,
        featured: false,
        registrationRequired: true,
        image:
          "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop&crop=center",
        description:
          "Join our community in serving those in need through volunteer work.",
      },
      {
        id: 3,
        title: "Islamic History Lecture",
        date: new Date(2024, 9, 30),
        time: "7:30 PM",
        location: "Main Hall",
        category: "education",
        attendees: 120,
        featured: false,
        registrationRequired: true,
        image:
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop&crop=center",
        description:
          "Exploring the rich heritage of Islamic civilization with Dr. Amira Hassan.",
      },
      {
        id: 4,
        title: "Quran Study Circle",
        date: new Date(2027, 10, 5),
        time: "7:00 PM",
        location: "Learning Center",
        category: "education",
        attendees: 45,
        featured: false,
        registrationRequired: true,
        image:
          "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&h=250&fit=crop&crop=center",
        description:
          "Weekly Quran study and tafsir session. Open to all levels.",
      },
      {
        id: 5,
        title: "Interfaith Dialogue",
        date: new Date(2024, 10, 15),
        time: "6:00 PM",
        location: "Conference Room",
        category: "community",
        attendees: 200,
        featured: true,
        registrationRequired: true,
        image:
          "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=250&fit=crop&crop=center",
        description:
          "Building bridges between communities through meaningful dialogue.",
      },
      {
        id: 6,
        title: "Youth Soccer Tournament",
        date: new Date(2024, 10, 23),
        time: "2:00 PM",
        location: "Sports Complex",
        category: "youth",
        attendees: 60,
        featured: false,
        registrationRequired: true,
        image:
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop&crop=center",
        description:
          "Annual youth soccer tournament promoting fitness and teamwork.",
      },
      {
        id: 7,
        title: "Islamic Calligraphy Workshop",
        date: new Date(2024, 11, 5),
        time: "10:00 AM",
        location: "Arts Studio",
        category: "education",
        attendees: 25,
        featured: true,
        registrationRequired: true,
        image:
          "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop&crop=center",
        description:
          "Learn the beautiful art of Arabic calligraphy with master calligrapher Ustadh Ahmad.",
      },
      {
        id: 8,
        title: "Charity Gala",
        date: new Date(2024, 11, 14),
        time: "7:30 PM",
        location: "Grand Ballroom",
        category: "community",
        attendees: 300,
        featured: true,
        registrationRequired: true,
        image:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop&crop=center",
        description:
          "Annual charity gala supporting local families and international relief efforts.",
      },
    ],
    []
  );

  // News Data
  const newsData = useMemo(
    () => [
      {
        id: 1,
        title: "New Islamic School Opens in Downtown",
        date: "October 20, 2024",
        category: "education",
        featured: true,
        image:
          "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop&crop=center",
        excerpt:
          "Al-Noor Islamic Academy welcomes its first students with state-of-the-art facilities.",
      },
      {
        id: 2,
        title: "Ramadan Food Drive Exceeds Goals",
        date: "October 18, 2024",
        category: "community",
        featured: true,
        image:
          "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=250&fit=crop&crop=center",
        excerpt:
          "Community raises over $50,000 and 10,000 meals for local families in need.",
      },
      {
        id: 3,
        title: "Interfaith Peace Conference Success",
        date: "October 15, 2024",
        category: "interfaith",
        featured: false,
        image:
          "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=250&fit=crop&crop=center",
        excerpt:
          "Leaders from various faith communities gather to promote understanding and peace.",
      },
    ],
    []
  );

  // Categories
  const categories = [
    { id: "all", label: "All Events", icon: Calendar },
    { id: "prayer", label: "Prayer", icon: TbBuildingMosque },
    { id: "education", label: "Education", icon: BookOpen },
    { id: "community", label: "Community", icon: Heart },
    { id: "youth", label: "Youth", icon: Target },
  ];

  // Event registration handler
  const handleEventRegistration = (eventId) => {
    const newRegistered = new Set(registeredEvents);
    if (newRegistered.has(eventId)) {
      newRegistered.delete(eventId);
    } else {
      newRegistered.add(eventId);
    }
    setRegisteredEvents(newRegistered);
  };

  // Computed values
  const filteredEvents = useMemo(() => {
    return selectedCategory === "all"
      ? eventsData
      : eventsData.filter((event) => event.category === selectedCategory);
  }, [eventsData, selectedCategory]);

  const featuredEvents = useMemo(() => {
    return activeTab === "events"
      ? eventsData.filter((event) => event.featured).slice(0, 3)
      : newsData.filter((news) => news.featured).slice(0, 3);
  }, [eventsData, newsData, activeTab]);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return eventsData
      .filter((event) => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 4);
  }, [eventsData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/30 to-slate-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Sidebar
            currentDate={currentDate}
            viewDate={viewDate}
            setViewDate={setViewDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            eventsData={eventsData}
            hoveredDate={hoveredDate}
            setHoveredDate={setHoveredDate}
            upcomingEvents={upcomingEvents}
          />

          <div className="lg:col-span-3 space-y-8">
            {/* Page Header */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
                Events & News
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl">
                Stay connected with our vibrant Islamic community through
                upcoming events and latest news.
              </p>
            </div>

            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "events" && (
              <EventsContent
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                featuredEvents={featuredEvents}
                filteredEvents={filteredEvents}
                registeredEvents={registeredEvents}
                handleEventRegistration={handleEventRegistration}
              />
            )}

            {activeTab === "news" && <NewsContent newsData={newsData} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default IslamicEventsPage;
