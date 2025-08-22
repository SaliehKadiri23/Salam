// Helper functions for prayer time calculations
export const parseTimeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

export const getCurrentTimeInMinutes = (currentTime) => {
  return currentTime.getHours() * 60 + currentTime.getMinutes();
};

export const calculateTimeLeft = (prayerTime, currentTime) => {
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