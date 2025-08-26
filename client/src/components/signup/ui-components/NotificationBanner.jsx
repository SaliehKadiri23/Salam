import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectNotification } from "../../../redux/signupSlice";

const NotificationBanner = () => {
  const [hideNotification, setHideNotification] = useState(false)

  const notification = useSelector(selectNotification);


  if (!notification?.show) return null;

  setTimeout(() => {
    setHideNotification(true)
  }, 10000);

  return (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
        notification.type === "success"
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
      } ${hideNotification ? "hidden" : ""}`}
    >
      {notification.message}
    </div>
  );
};

export default NotificationBanner;