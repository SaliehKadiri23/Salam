import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Compass,
  BookOpen,
  Clock,
  Volume2,
  Star,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  RefreshCw,
  Plus,
  Minus,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  Award,
  Heart,
  MessageCircle,
} from "lucide-react";

// Helper functions outside component
const parseTimeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

const getCurrentTimeInMinutes = (currentTime) => {
  return currentTime.getHours() * 60 + currentTime.getMinutes();
};

const calculateTimeLeft = (prayerTime, currentTime) => {
  const prayerMinutes = parseTimeToMinutes(prayerTime);
  const currentMinutes = getCurrentTimeInMinutes(currentTime);

  let diff = prayerMinutes - currentMinutes;

  if (diff < 0) {
    diff += 24 * 60; // Next day
  }

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  const seconds = 60 - currentTime.getSeconds();

  return `${hours}h ${minutes}m ${seconds}s`;
};

// Static data
const islamicQuotes = [
  {
    text: "And whoever relies upon Allah - then He is sufficient for him.",
    reference: "Quran 65:3",
  },
  {
    text: "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth.",
    reference: "Quran 6:73",
  },
  {
    text: "Remember Allah and Allah will remember you.",
    reference: "Hadith",
  },
  {
    text: "The best of people are those who benefit others.",
    reference: "Prophet Muhammad (PBUH)",
  },
];

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

const islamicEvents = {
  1: "New Year",
  9: "Day of Ashura",
  12: "Mawlid an-Nabi",
  27: "Isra and Mi'raj",
  21: "Laylat al-Qadr",
  10: "Eid al-Adha",
};

const duas = {
  fajr: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا",
  dhuhr: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً",
  asr: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ",
  maghrib: "اللَّهُمَّ أَعِذْنِي مِنَ النَّارِ",
  isha: "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ",
};

// Sub-components defined outside main component
const Hero = ({ currentTime, location, currentQuote }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="relative mx-auto max-w-6xl px-4 py-12">
        {/* Location & Time */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg mb-4">
            <MapPin className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-medium text-gray-700">
              {location}
            </span>
          </div>
          <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="text-lg text-gray-600">
            {currentTime.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Islamic Quote */}
        <div className="bg-gradient-to-r from-emerald-600 to-amber-600 rounded-2xl p-6 text-white text-center shadow-xl">
          <MessageCircle className="h-8 w-8 mx-auto mb-4 opacity-80" />
          <p className="text-lg md:text-xl font-medium mb-2 leading-relaxed">
            "{islamicQuotes[currentQuote].text}"
          </p>
          <p className="text-emerald-100 text-sm">
            - {islamicQuotes[currentQuote].reference}
          </p>
        </div>
      </div>
    </section>
  );
};

const LocationSearch = ({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  handleUseMyLocation,
}) => {
  const inputRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(searchQuery.trim());
      inputRef.current?.blur();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="mx-auto max-w-4xl px-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none z-10" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for any city worldwide..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit(e);
              }
            }}
            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow-sm outline-none transition-all duration-200 relative z-0"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors z-10"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          onClick={handleUseMyLocation}
          disabled={location === "Detecting location..."}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none whitespace-nowrap"
        >
          <MapPin className="h-5 w-5" />
          <span>
            {location === "Detecting location..."
              ? "Detecting..."
              : "Use My IP Address"}
          </span>
        </button>
      </div>
    </div>
  );
};

const PrayerTable = ({ prayerTimes, currentTime }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-emerald-50 to-amber-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Prayer
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Begins (IQAMA)
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Iqama
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Time Left
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Dua
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {prayerTimes.map((prayer, index) => {
              const IconComponent = prayer.icon;
              const timeLeft = calculateTimeLeft(prayer.begins, currentTime);

              return (
                <tr
                  key={prayer.name}
                  className={`transition-all duration-200 ${
                    prayer.next
                      ? "bg-gradient-to-r from-emerald-50 to-amber-50 border-l-4 border-emerald-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${
                          prayer.next
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <span
                        className={`font-semibold ${
                          prayer.next ? "text-emerald-700" : "text-gray-700"
                        }`}
                      >
                        {prayer.name}
                      </span>
                    </div>
                  </td>
                  <td
                    className={`px-6 py-4 text-lg font-bold ${
                      prayer.next ? "text-emerald-600" : "text-gray-700"
                    }`}
                  >
                    {prayer.begins}
                  </td>
                  <td
                    className={`px-6 py-4 text-lg font-bold ${
                      prayer.next ? "text-emerald-600" : "text-gray-700"
                    }`}
                  >
                    {prayer.iqama}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-mono ${
                      prayer.next
                        ? "text-emerald-600 font-bold"
                        : "text-gray-500"
                    }`}
                  >
                    {timeLeft}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-amber-600 hover:text-amber-700 transition-colors p-2 rounded-lg hover:bg-amber-50"
                      onClick={() => {
                        alert(
                          `Dua for ${prayer.name}: ${
                            duas[prayer.name.toLowerCase()] ||
                            "No dua available"
                          }`
                        );
                      }}
                      title={`View dua for ${prayer.name}`}
                    >
                      <BookOpen className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const HijriCalendar = ({ currentHijriMonth, setCurrentHijriMonth }) => {
  const hijriDays = useMemo(
    () => Array.from({ length: 30 }, (_, i) => i + 1),
    []
  );
  const currentDay = 15; // Mock current day

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() =>
                setCurrentHijriMonth((prev) => (prev - 1 + 12) % 12)
              }
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">
                {hijriMonths[currentHijriMonth]} 1446
              </h3>
              <p className="text-sm text-gray-600">Hijri Calendar</p>
            </div>
            <button
              onClick={() => setCurrentHijriMonth((prev) => (prev + 1) % 12)}
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

const UtilityCards = ({
  qiblaDirection,
  dhikrCount,
  setDhikrCount,
  notificationsEnabled,
  handleEnableNotifications,
  audioPlaying,
  setAudioPlaying,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Qibla Compass */}
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div
            className="w-full h-full border-4 border-emerald-200 rounded-full relative transition-transform duration-1000"
            style={{ transform: `rotate(${qiblaDirection}deg)` }}
          >
            <Compass className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-emerald-600" />
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-red-500"></div>
          </div>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">Qibla Direction</h3>
        <p className="text-2xl font-bold text-emerald-600">{qiblaDirection}°</p>
        <p className="text-sm text-gray-600">Northeast</p>
      </div>

      {/* Dhikr Counter */}
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-amber-700">
            {dhikrCount}
          </span>
        </div>
        <h3 className="font-semibold text-gray-800 mb-4">Digital Tasbih</h3>
        <div className="flex space-x-2 justify-center">
          <button
            onClick={() => setDhikrCount((prev) => Math.max(0, prev - 1))}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDhikrCount((prev) => prev + 1)}
            className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full hover:from-amber-600 hover:to-amber-700 transition-all transform hover:scale-105"
          >
            <Plus className="h-5 w-5" />
          </button>
          <button
            onClick={() => setDhikrCount(0)}
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Prayer Notifications */}
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
        <div
          className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
            notificationsEnabled ? "bg-emerald-100" : "bg-gray-100"
          }`}
        >
          <Bell
            className={`h-8 w-8 ${
              notificationsEnabled ? "text-emerald-600" : "text-gray-400"
            }`}
          />
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">Prayer Alerts</h3>
        <button
          onClick={handleEnableNotifications}
          disabled={notificationsEnabled}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            notificationsEnabled
              ? "bg-emerald-100 text-emerald-700 cursor-default"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          {notificationsEnabled ? "Enabled" : "Enable"}
        </button>
      </div>

      {/* Audio Adhan */}
      <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
          <Volume2 className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">Adhan Audio</h3>
        <button
          onClick={() => setAudioPlaying(!audioPlaying)}
          className="flex items-center space-x-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          {audioPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          <span className="text-sm">{audioPlaying ? "Pause" : "Play"}</span>
        </button>
      </div>
    </div>
  );
};

// Main component
export default function PrayerTimes() {
  // States
  const [activeTab, setActiveTab] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState("New York, USA");
  const [searchQuery, setSearchQuery] = useState("");
  const [qiblaDirection, setQiblaDirection] = useState(45);
  const [dhikrCount, setDhikrCount] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentHijriMonth, setCurrentHijriMonth] = useState(0);

  // Mock data with scalability in mind
  const prayerTimes = useMemo(
    () => [
      {
        name: "Fajr",
        begins: "05:30",
        iqama: "05:45",
        icon: Moon,
        next: false,
      },
      {
        name: "Sunrise",
        begins: "06:45",
        iqama: "-",
        icon: Sunrise,
        next: false,
      },
      { name: "Dhuhr", begins: "13:15", iqama: "13:30", icon: Sun, next: true },
      { name: "Asr", begins: "17:00", iqama: "17:15", icon: Sun, next: false },
      {
        name: "Maghrib",
        begins: "20:30",
        iqama: "20:45",
        icon: Sunset,
        next: false,
      },
      {
        name: "Isha",
        begins: "22:00",
        iqama: "22:15",
        icon: Moon,
        next: false,
      },
    ],
    []
  );

  // Effects
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % islamicQuotes.length);
    }, 10000);

    return () => clearInterval(quoteTimer);
  }, []);

  // Simulate IP location detection
  const handleUseMyLocation = () => {
    setLocation("Detecting location...");
    // Simulate API call delay
    setTimeout(() => {
      setLocation("San Francisco, CA, USA");
    }, 2000);
  };

  // Request notification permission
  const handleEnableNotifications = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setNotificationsEnabled(true);
          new Notification("Prayer notifications enabled!", {
            body: "You'll receive reminders for upcoming prayers.",
            icon: "/favicon.ico",
          });
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <main className="pb-12">
        <Hero
          currentTime={currentTime}
          location={location}
          currentQuote={currentQuote}
        />

        <section className="mx-auto max-w-6xl px-4">
          <LocationSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            location={location}
            setLocation={setLocation}
            handleUseMyLocation={handleUseMyLocation}
          />

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-xl sm:p-6 py-6 px-3 mb-8">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab(0)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 0
                    ? "bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Prayer Times
              </button>
              <button
                onClick={() => setActiveTab(1)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 1
                    ? "bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Hijri Calendar
              </button>
            </div>

            {activeTab === 0 ? (
              <PrayerTable
                prayerTimes={prayerTimes}
                currentTime={currentTime}
              />
            ) : (
              <HijriCalendar
                currentHijriMonth={currentHijriMonth}
                setCurrentHijriMonth={setCurrentHijriMonth}
              />
            )}
          </div>

          <UtilityCards
            qiblaDirection={qiblaDirection}
            dhikrCount={dhikrCount}
            setDhikrCount={setDhikrCount}
            notificationsEnabled={notificationsEnabled}
            handleEnableNotifications={handleEnableNotifications}
            audioPlaying={audioPlaying}
            setAudioPlaying={setAudioPlaying}
          />
        </section>
      </main>
    </div>
  );
}
