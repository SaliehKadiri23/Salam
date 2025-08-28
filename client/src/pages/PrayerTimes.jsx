import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Moon, Sun, Sunrise, Sunset } from "lucide-react";

// Import extracted components
import Hero from "../components/prayer-times/hero/Hero";
import LocationSearch from "../components/prayer-times/location/LocationSearch";
import PrayerTable from "../components/prayer-times/table/PrayerTable";
import HijriCalendar from "../components/prayer-times/calendar/HijriCalendar";
import UtilityCards from "../components/prayer-times/utilities/UtilityCards";

// Import Redux actions
import {
  setPrayerTimes,
  setLocation,
  setSearchQuery,
  setNotificationsEnabled,
  setAudioPlaying,
} from "../redux/prayerTimesSlice";
import { setCurrentHijriMonth } from "../redux/hijriCalendarSlice";
import {
  setQiblaDirection,
  setDhikrCount,
  nextQuote,
} from "../redux/islamicUtilitiesSlice";
import { setActiveTab } from "../redux/uiSlice";

// Main component
export default function PrayerTimes() {
  // Only keep currentTime as local state (updates every second)
  const [currentTime, setCurrentTime] = useState(new Date());

  // Redux state selectors
  const dispatch = useDispatch();
  const {
    prayerTimes,
    location,
    searchQuery,
    notificationsEnabled,
    audioPlaying,
  } = useSelector((state) => state.prayerTimes);
  const { currentHijriMonth } = useSelector((state) => state.hijriCalendar);
  const { qiblaDirection, dhikrCount, currentQuote, islamicQuotes } =
    useSelector((state) => state.islamicUtilities);
  const { activeTab } = useSelector((state) => state.ui);

  // Note: Initial prayer times are now handled by Redux store initialState

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update current quote periodically using Redux dispatch
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      dispatch(nextQuote(islamicQuotes.length));
    }, 10000);

    return () => clearInterval(quoteTimer);
  }, [dispatch, islamicQuotes.length]);

  // Location handler
  const handleUseMyLocation = () => {
    dispatch(setLocation("Detecting location..."));
    // Simulate API call delay
    setTimeout(() => {
      dispatch(setLocation("Kano State, Nigeria"));
    }, 2000);
  };

  // Request notification permission
  const handleEnableNotifications = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          dispatch(setNotificationsEnabled(true));
          new Notification("Prayer notifications enabled!", {
            body: "You'll receive reminders for upcoming prayers.",
            icon: "/favicon.ico",
          });
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700">
      <main className="pb-12">
        <Hero
          currentTime={currentTime}
          location={location}
          currentQuote={currentQuote}
        />

        <section className="mx-auto max-w-6xl px-4">
          <LocationSearch
            searchQuery={searchQuery}
            setSearchQuery={(query) => dispatch(setSearchQuery(query))}
            location={location}
            setLocation={(loc) => dispatch(setLocation(loc))}
            handleUseMyLocation={handleUseMyLocation}
          />

          {/* Tabs */}
          <div className="bg-white dark:bg-black/75 dark:border dark:border-emerald-600 rounded-2xl shadow-xl sm:p-6 py-6 px-3 mb-8">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => dispatch(setActiveTab(0))}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 0
                    ? "bg-gradient-to-r from-emerald-500 to-amber-500 text-white dark:text-black shadow-lg"
                    : "text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-500 "
                }`}
              >
                Prayer Times
              </button>
              <button
                onClick={() => dispatch(setActiveTab(1))}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === 1
                    ? "bg-gradient-to-r from-emerald-500 to-amber-500 text-white shadow-lg dark:text-black"
                    : "text-gray-600 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-500 "
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
                setCurrentHijriMonth={(month) =>
                  dispatch(setCurrentHijriMonth(month))
                }
              />
            )}
          </div>

          <UtilityCards
            qiblaDirection={qiblaDirection}
            dhikrCount={dhikrCount}
            setDhikrCount={(count) => dispatch(setDhikrCount(count))}
            notificationsEnabled={notificationsEnabled}
            handleEnableNotifications={handleEnableNotifications}
            audioPlaying={audioPlaying}
            setAudioPlaying={(playing) => dispatch(setAudioPlaying(playing))}
          />
        </section>
      </main>
    </div>
  );
}
