import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Moon, Sun, Sunrise, Sunset } from "lucide-react";
import { toast } from "react-toastify";

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
  setCurrentQuote,
  setIslamicQuotes,
} from "../redux/islamicUtilitiesSlice";
import { setActiveTab } from "../redux/uiSlice";
import {
  useGetPrayerTimesByIPLocationQuery,
  useGetPrayerTimesByLocationQuery,
  useGetLatestIslamicQuotesQuery,
} from "../services/apiSlice";

// Main component
export default function PrayerTimes() {
  // Only keep currentTime as local state (updates every second)
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDetecting, setIsDetecting] = useState(false);

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
  const { qiblaDirection, dhikrCount, currentQuote } =
    useSelector((state) => state.islamicUtilities);
  const { activeTab } = useSelector((state) => state.ui);

  // RTK Query hooks
  const {
    data: ipData,
    error: ipError,
    isLoading: ipLoading,
    refetch: refetchIpData,
  } = useGetPrayerTimesByIPLocationQuery();
  const {
    data: locationData,
    error: locationError,
    isLoading: locationLoading,
  } = useGetPrayerTimesByLocationQuery(location, {
    skip:
      !location ||
      location === "Location Not Found" ||
      location === "Detecting location...",
  });
  const {
    data: quotesData,
    error: quotesError,
    isLoading: quotesLoading,
  } = useGetLatestIslamicQuotesQuery();

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update current quote periodically using Redux dispatch
  useEffect(() => {
    // Only update quotes if we have data from the backend
    if (quotesData && quotesData.data && quotesData.data.length > 0) {
      // Update Redux state with backend quotes
      dispatch(setIslamicQuotes(quotesData.data));
      
      // Set up interval to rotate quotes
      const quoteTimer = setInterval(() => {
        dispatch(nextQuote(quotesData.data.length));
      }, 10000);
      
      return () => clearInterval(quoteTimer);
    }
  }, [dispatch, quotesData]);

  // Fetch prayer times when component mounts
  useEffect(() => {
    if (
      !location ||
      location === "Location Not Found"
    ) {
      // RTK Query will automatically fetch when the component mounts
    }
  }, [location]);

  // Update Redux state when IP data is fetched
  useEffect(() => {
    let timeoutId;
    
    if (ipLoading) {
      dispatch(setLocation("Detecting location..."));
      
      // Set a timeout to reset the location if detection takes too long
      timeoutId = setTimeout(() => {
        dispatch(setLocation(""));
        dispatch(setError("Location detection timed out. Please try again."));
      }, 15000); // 15 seconds timeout
    }
    
    if (ipData) {
      dispatch(setPrayerTimes(ipData.prayerTimes));
      dispatch(setLocation(ipData.location));
      
      // Show success toast notification
      toast.success(`Prayer times updated for ${ipData.location}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Clear timeout if data is received
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
    
    // Cleanup timeout on unmount or when dependencies change
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [ipData, ipLoading, dispatch]);

  // Update Redux state when location data is fetched
  useEffect(() => {
    if (locationData) {
      dispatch(setPrayerTimes(locationData.prayerTimes));
      dispatch(setLocation(locationData.location));
    }
  }, [locationData, dispatch]);

  // Handle IP fetch errors
  useEffect(() => {
    if (ipError) {
      // Show error with toast notification
      toast.error(`Error detecting your location: ${ipError.message || "Failed to detect your location automatically."}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Reset location to default when IP detection fails
      dispatch(setLocation(""));
      // Still show the default prayer times
      dispatch(setPrayerTimes([
        {
          name: "Fajr",
          begins: "05:30",
          iqama: "05:45",
          icon: "Moon",
          next: false
        },
        {
          name: "Sunrise",
          begins: "06:45",
          iqama: "-",
          icon: "Sunrise",
          next: false
        },
        {
          name: "Dhuhr",
          begins: "13:15",
          iqama: "13:30",
          icon: "Sun",
          next: true
        },
        {
          name: "Asr",
          begins: "17:00",
          iqama: "17:15",
          icon: "Sun",
          next: false
        },
        {
          name: "Maghrib",
          begins: "20:30",
          iqama: "20:45",
          icon: "Sunset",
          next: false
        },
        {
          name: "Isha",
          begins: "22:00",
          iqama: "22:15",
          icon: "Moon",
          next: false
        }
      ]));
    }
  }, [ipError, dispatch]);

  // Location handler - IP-based detection
  const handleUseMyLocation = () => {
    // Set detecting state to true
    setIsDetecting(true);
    
    // Trigger refetch of IP-based prayer times
    refetchIpData();
    
    // After 1500ms, set detecting state back to false
    setTimeout(() => {
      setIsDetecting(false);
    }, 1500);
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
          <LocationSearch handleUseMyLocation={handleUseMyLocation} isDetecting={isDetecting} />

          {/* Loading indicator */}
          {(ipLoading || locationLoading) && (
            <div className="text-center py-4">
              <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                Fetching prayer times...
              </p>
            </div>
          )}

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
