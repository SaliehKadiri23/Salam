import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bell } from 'lucide-react';
import { setNotificationsEnabled } from '../../../redux/prayerTimesSlice';
import { motion } from "framer-motion";

const PrayerNotifications = () => {
  const dispatch = useDispatch();
  const notificationsEnabled = useSelector((state) => state.prayerTimes.notificationsEnabled);

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
    <motion.div
      initial={{
        opacity: 0,
        y: 300,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
      }}
      exit={{
        opacity: 0,
        y: 300,
      }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-xl p-6 text-center"
    >
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
    </motion.div>
  );
};

export default PrayerNotifications;