// Utility function to convert 24-hour time format to 12-hour AM/PM format
export const convertTo12HourFormat = (time24) => {
  if (!time24 || time24 === "-") return time24;
  
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
};