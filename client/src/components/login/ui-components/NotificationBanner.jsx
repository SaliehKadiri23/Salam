import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { selectNotification, hideNotification } from '../../../redux/loginUiSlice';


const NotificationBanner = () => {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification);

  // Auto-hide notification after timeout
  useEffect(() => {
    if (notification.show && notification.autoHideTimeout > 0) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, notification.autoHideTimeout);

      return () => clearTimeout(timer);
    }
  }, [notification.show, notification.autoHideTimeout, dispatch]);

  // Get notification styling based on type
  const getNotificationStyles = (type) => {
    const styles = {
      success: {
        bg: 'bg-green-500',
        icon: CheckCircle,
        iconColor: 'text-white'
      },
      error: {
        bg: 'bg-red-500',
        icon: AlertCircle,
        iconColor: 'text-white'
      },
      warning: {
        bg: 'bg-yellow-500',
        icon: AlertTriangle,
        iconColor: 'text-white'
      },
      info: {
        bg: 'bg-blue-500',
        icon: Info,
        iconColor: 'text-white'
      }
    };

    return styles[type] || styles.info;
  };

  const styles = getNotificationStyles(notification.type);
  const IconComponent = styles.icon;

  return (
    <AnimatePresence>
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30 
          }}
          className={`
            fixed top-4 right-4 z-50 min-w-80 max-w-md
            ${styles.bg} text-white rounded-lg shadow-2xl
            border border-white/20 backdrop-blur-sm
          `}
        >
          <div className="p-4 flex items-start gap-3">
            {/* Notification Icon */}
            <div className="flex-shrink-0 mt-0.5">
              <IconComponent className={`w-5 h-5 ${styles.iconColor}`} />
            </div>

            {/* Notification Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white break-words">
                {notification.message}
              </p>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => dispatch(hideNotification())}
              className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Progress bar for auto-hide */}
          {notification.autoHideTimeout > 0 && (
            <motion.div
              className="h-1 bg-white/30"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ 
                duration: notification.autoHideTimeout / 1000,
                ease: "linear"
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationBanner;